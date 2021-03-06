/**
 * Cross Environment Data Repositories for Causes.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
 **/

import axios from "axios";
import { Auditable } from "../../types/auditable";
import { CauseDto } from "../../types/dtos/cause.dtos";
import {
  EntityFetchedDto,
  EntityFetchedPageDto,
  EntityCreatedDto,
  EntityUpdatedDto,
  EntityDeletedDto,
} from "../../types/dtos/server-message.dtos";
import { AuthProvider, DatabaseProvider } from "../../types/enums/providers";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";
import apiMap from "../../api/api-map.json";
import { authClientFactory } from "../../api/clients";
import { VerificationStatus } from "../../types/enums/status";
import AppEvent from "../entities/event.entity";
import { EventType } from "../../types/enums/events";
import { queryMap2string } from "../../utils/parse-querystring";
import { authServiceFactory } from "../../api/services";
import { UserRole } from "../../types/dtos/user.dtos";
import { eventHeadings } from "../../utils/timeline_event_headings";

/**
 * Cause Data Access Repository
 * @version 1.0.0b uses Firebase as Provider
 */
export default class CauseRepo extends BaseRepo implements ICRUDREPO<CauseDto> {
  private static _instance: CauseRepo | null;
  private entity = "cause";
  constructor() {
    super(DatabaseProvider.FIREBASE);
  }
  async get(
    identifier: string
  ): Promise<EntityFetchedDto<Auditable & Ownable & CauseDto>> {
    if (this.isBrowser) {
      const path = apiMap.v1["[entity]"]["[id]"].root
        .replace("[entity]", this.entity)
        .replace("[id]", identifier);
      return (await axios.get(path)).data as EntityFetchedDto<
        Auditable & Ownable & CauseDto
      >;
    } else {
      return (this.db as IDatabaseService).find(identifier, this.entity);
    }
  }
  getAll(): Promise<EntityFetchedPageDto<Auditable & CauseDto[]>> {
    throw new Error("Method not implemented.");
  }
  async getPage(
    page: Page,
    queryMap?: Map<string, string | number>
  ): Promise<EntityFetchedPageDto<Auditable & Ownable & CauseDto>> {
    if (this.isBrowser) {
      let path = apiMap.v1["[entity]"].root
        .replace("[entity]", this.entity)
        .concat("?", "limit=", page.limit.toString());
      if (page.start) {
        path = path.concat("&from=", String(page.start));
      }
      if (queryMap) {
        path = path.concat("&query=", queryMap2string(queryMap));
      }
      try {
        return (await axios.get(path, {})).data.data;
      } catch (error) {
        throw error;
      }
    } else {
      return (this.db as IDatabaseService).findPage(
        page,
        this.entity,
        queryMap
      );
    }
  }
  async create(
    data: CauseDto
  ): Promise<EntityCreatedDto<Auditable & Ownable & CauseDto>> {
    if (this.isBrowser) {
      const path = apiMap.v1["[entity]"].root.replace("[entity]", this.entity);
      //FIXME move this to BaseRepo
      const token = authClientFactory.getClient(
        AuthProvider.FIREBASE
      ).accessToken;
      const causeData = (
        await axios({
          url: path,
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          data,
        })
      ).data as EntityCreatedDto<Auditable & Ownable & CauseDto>;
      return causeData;
    } else {
      const _data: CauseDto = {
        ...data,
        isVerified: false,
        verificationStatus: VerificationStatus.QUEUED,
      };
      return (this.db as IDatabaseService)
        .save(_data, this.entity)
        .then((res) => {
          if (res.data) {
            /** create a Cause Created event */
            AppEvent.create({
              eventType: EventType.CAUSE_CREATED,
              topic: (res.data as any)._id,
              message: "campaign created",
            });
          }
          return res;
        });
    }
  }
  async update(
    identifier: string,
    data: CauseDto
  ): Promise<EntityUpdatedDto<Auditable & Ownable & CauseDto>> {
    if (this.isBrowser) {
      const path = apiMap.v1["[entity]"]["[id]"].root
        .replace("[entity]", this.entity)
        .replace("[id]", identifier);
      const token = authClientFactory.getClient(
        AuthProvider.FIREBASE
      ).accessToken;
      return (
        await axios.put(path, data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      ).data;
    } else {
      const { data: cause } = await this.get(identifier);
      const user = authServiceFactory.getService(
        AuthProvider.FIREBASE
      ).authenticatedUser;

      let allowUpdate = false;
      let verificationStatusChanged = cause?.verificationStatus !== data.verificationStatus;
      let verificationChanged = cause?.isVerified !== data.isVerified;
      /**
       * perm check 1
       * check if verification status and/or isVerified is being updated
       * in such cases the current user MUST have MOD or ADMIN privileges.
       * also create a Campaign Verification Change event.
       * */
      if (
       ( verificationStatusChanged || verificationChanged) &&
        (user?.role === UserRole.ADMIN || user?.role === UserRole.MODERATOR) &&
        cause?.owner !== user.uid
      ) {
        allowUpdate = true;
      }
      /**
       * additional checks may take place here changing the allowUpdate flag
       * accordingly.
       */

      /**
       * Perm check 2
       * allow all updates if curr user is MOD or admin
       * TODO: may need revision
       */
      if (user?.role === UserRole.ADMIN || user?.role === UserRole.MODERATOR) {
        allowUpdate = true;
      }

      
      if(allowUpdate){
        return (this.db as IDatabaseService).update(
          identifier,
          data,
          this.entity
        )
        .then((res)=>{
          if(verificationStatusChanged){
            const wasRejected = data.verificationStatus === VerificationStatus.REJECTED;
            const wasApproved = data.verificationStatus === VerificationStatus.VERIFIED;
            let eventType: EventType;

            if(wasApproved || wasRejected){
              if(wasRejected) {
                eventType = EventType.CAUSE_DECLINED
              } else {
                eventType = EventType.CAUSE_VERIFIED
              }
              AppEvent.create({
                eventType,
                topic: cause?.id as string,
                message: eventHeadings(eventType)
              })
  
            } else {
              // TODO: Create Event for InProgress 
            }
          }
          return res;
        })
      }else {
        throw new Error('unauthorized');
      }
    }
  }
  delete(
    identifier: string
  ): Promise<EntityDeletedDto<Auditable & Ownable & CauseDto>> {
    if (this.isBrowser) {
      throw new Error("Method not implemented");
    } else {
      return (this.db as IDatabaseService).delete(identifier, this.entity);
    }
  }

  /** Returns the repo instance. */
  static getRepo(): CauseRepo {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new CauseRepo());
    }
  }
}
