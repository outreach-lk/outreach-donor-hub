import { Auditable } from "../../../../types/auditable";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../../../types/dtos/server-message.dtos";
import { IDatabaseClient } from "../../../../types/interfaces/db.client.interface";
import { Page } from "../../../../types/pagable";
import app from "../../../../libs/firebase.client.sdk"
import {doc, setDoc, getFirestore, Firestore} from "firebase/firestore"
import { getAuth, Auth } from "firebase/auth";

export default class FirebaseDatabseClient implements IDatabaseClient{
    private db: Firestore;
    private auth: Auth

    constructor(){
        this.db = getFirestore(app);
        this.auth = getAuth(app);
    }

    get<T>(identifier: string): Promise<EntityFetchedDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }
    getAll<T>(): Promise<EntityFetchedPageDto<Auditable & T[]>> {
        throw new Error("Method not implemented.");
    }
    getPage<T>(page: Page<T>): Promise<EntityFetchedPageDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }
    create<T>(data: T, entity: string, id: string): Promise<EntityCreatedDto<Auditable & T>> {
        try {
            const document = doc(this.db, entity, id)
            return setDoc( document, data)
            .then(()=>{
                return {
                    method: 'n/a',
                    path: 'n/a',
                    serverTime: new Date(),
                    wasRequestAuthorized: !!this.auth.currentUser,
                    code: '201',
                    data,
                } as EntityCreatedDto<Auditable & T>;
            })

        } catch (error) {
            throw error; //FIXME handle exception or throw meaningful error.
        }
    }
    update<T>(identifier: string, sdata: T): Promise<EntityUpdatedDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }
    delete<T>(identifier: string): Promise<EntityDeletedDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }

}