import { Auditable } from "../../../../types/auditable";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../../../types/dtos/server-message.dtos";
import { IDatabaseService } from "../../../../types/interfaces/db.service.interface";
import { Page } from "../../../../types/pagable";
import init from "../../../../libs/firebase.admin.sdk";
import {Firestore} from 'firebase-admin/firestore'
import { getDocPath } from "../../../../utils/firebase-utils";
export default class FirebaseDatabaseService implements IDatabaseService{
    private serverPrivateKey: string;
    private firestore: Firestore;

    constructor(key:string){
        this.serverPrivateKey = key;
        this.firestore = init().firestore();
    }

    find<T>(identifier: string, entity: string): Promise<EntityFetchedDto<Auditable & T>> {
        return this.firestore.doc( getDocPath(entity, identifier) ).get()
        .then(doc => {
            if(doc.exists){
                return {
                    method: 'n/a',
                    serverTime: new Date(),
                    path: 'n/a',
                    wasRequestAuthorized: true,
                    data: doc.data()
                } as EntityFetchedDto<Auditable & T>
            } else {
                throw new Error ('Item Not Found')
            }
        })
        .catch(error => {
            throw new Error('Error Running Find on db')
        })
    }
    findAll<T>(entity: string): Promise<EntityFetchedPageDto<Auditable & T[]>> {
        throw new Error("Method not implemented.");
    }
    findPage<T>(page: Page<T>, entity: string): Promise<EntityFetchedPageDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }
    save<T>(data: T, entity: string, id?: string): Promise<EntityCreatedDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }
    update<T>(identifier: string, data: T, entity: string): Promise<EntityUpdatedDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }
    delete<T>(identifier: string, entity: string): Promise<EntityDeletedDto<Auditable & T>> {
        throw new Error("Method not implemented.");
    }
    
}