import { Auditable } from "../../../../types/auditable";
import {
  EntityFetchedDto,
  EntityFetchedPageDto,
  EntityCreatedDto,
  EntityUpdatedDto,
  EntityDeletedDto,
} from "../../../../types/dtos/server-message.dtos";
import { IDatabaseService } from "../../../../types/interfaces/db.service.interface";
import { Page } from "../../../../types/pagable";
import init from "../../../../libs/firebase.admin.sdk";
import { Firestore } from "firebase-admin/firestore";
import { getDocPath } from "../../../../utils/firebase-utils";
import { generateEntityId } from "../../../../utils/generate-ids";
import { AccessPerms, Ownable } from "../../../../types/ownable";
import userEntity from "../../../../data/entities/user.entity";
import { start } from "repl";
import { getEntityDefaultPermissions } from "../../../../utils/entity-perms";
export default class FirebaseDatabaseService implements IDatabaseService {
  private serverPrivateKey: string;
  private firestore: Firestore;
  authenticatedUser: userEntity | null;

  constructor(key: string) {
    this.serverPrivateKey = key;
    this.firestore = init().firestore();
    this.authenticatedUser = null;
  }

  find<T>(
    identifier: string,
    entity: string
  ): Promise<EntityFetchedDto<Auditable & T>> {
    return this.firestore
      .doc(getDocPath(entity, identifier))
      .get()
      .then((doc) => {
        if (doc.exists && !doc.data()?.isDeleted) {
          return {
            method: "firebase_db_service:find",
            serverTime: new Date(),
            path: "n/a",
            authorizationPresent: true,
            data: doc.data(),
          } as EntityFetchedDto<Auditable & T>;
        } else {
          throw new Error("Item Not Found");
        }
      });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll<T>(entity: string): Promise<EntityFetchedPageDto<Auditable & T[]>> {
    throw new Error("Method not implemented.");
  }
  async findPage<T>(
    page: Page,
    entity: string,
    queryMap?: Map<string, string | number>
  ): Promise<EntityFetchedPageDto<Auditable & T>> {
    let query = this.firestore.collection(entity).limit(page.limit);
    query = query.where("isDeleted", "!=", true);
    if (queryMap) {
      /** FIXME: Also support inequalities */
      queryMap.forEach((value, key) => {
        let _value: any = value;
        if (value === "true") {
          _value = true;
        } else if (value === "false") {
          _value == false;
        } else if (!isNaN(Number(_value as string))){
          _value = Number(_value);
        }
        if(value.toString().match(" OR ")){
          const values = value.toString().split(" OR ");
          query = query.where(key, "in", values)
        } else {
          query = query.where(key, "==", _value);
        }
      });
    }

    query = query.orderBy("isDeleted").orderBy("createdOn", "desc");
    if (page.start) {
      /**
       * Try splitting the start value with = to check
       * if a custom field is being queried.
       * if not, default to _id
       */
      const [k, v] = (page.start as string).split(":");
      if (v) {
        /**
         * FIXME: This may be faulty
         */
        query = query.startAfter(v);
      } else {
        const startSnap = await this.firestore
          .doc(`${entity}/${page.start}`)
          .get();
        query = query.startAfter(startSnap);
      }
      query = query;
    }
    return query.get().then((data) => {
      return {
        method: "firebase_db_service:findPage",
        serverTime: new Date(),
        path: "n/a",
        authorizationPresent: true,
        data: {
          current: page,
          data: data.docs.map((doc) => doc.data()) as Array<Auditable & T>,
        },
      } as EntityFetchedPageDto<Auditable & T>;
    });
  }
  save<T>(
    data: T,
    entity: string,
    id?: string
  ): Promise<EntityCreatedDto<Auditable & T>> {
    if (!id) id = generateEntityId(entity);
    if ((data as any).permissions) {
      delete (data as any).permissions;
    }
    return this.firestore
      .collection(entity)
      .doc(id)
      .create({
        _id: id,
        id,
        ...data,
        permissions: (data as any).permissions || getEntityDefaultPermissions(entity),
        createdOn: new Date(),
        createdBy: this.authenticatedUser?.uid || '__system',
        isDeleted: false,
        owner: this.authenticatedUser?.uid || '__system',
        sharedWith: (data as any).sharedWith || [],
      } as Auditable & Ownable & T)
      .then(() => {
        return {
          method: "firebase_db_service:save",
          serverTime: new Date(),
          path: "n/a",
          authorizationPresent: true,
          data: {
            ...data,
            _id: id,
          },
        } as EntityCreatedDto<Auditable & T>;
      });
  }
  update<T>(
    identifier: string,
    data: T,
    entity: string
  ): Promise<EntityUpdatedDto<Auditable & T>> {
    if ((data as any).permissions) {
      delete (data as any).permissions;
    }
    return this.firestore
      .doc(getDocPath(entity, identifier))
      .update({
        ...data,
        updatedBy: this.authenticatedUser?.uid,
        updatedOn: new Date(),
      } as Auditable & Ownable & T)
      .then(() => {
        return {
          method: "firebase_db_service:update",
          serverTime: new Date(),
          path: "n/a",
          authorizationPresent: true,
          data: { ...data },
        } as EntityUpdatedDto<Auditable & T>;
      });
  }
  delete<T>(
    identifier: string,
    entity: string
  ): Promise<EntityDeletedDto<Auditable & T>> {
    return this.firestore
      .doc(getDocPath(entity, identifier))
      .update({
        isDeleted: true,
        deletedBy: this.authenticatedUser?.uid,
        deletedOn: new Date(),
      } as Auditable)
      .then(() => {
        return {
          method: "firebase_db_service:delete",
          serverTime: new Date(),
          path: "n/a",
          authorizationPresent: true,
        } as EntityDeletedDto<Auditable & T>;
      });
  }
}
