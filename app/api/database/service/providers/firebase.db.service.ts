import { Auditable } from "../../../../types/auditable";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../../../types/dtos/server-message.dtos";
import { IDatabaseService } from "../../../../types/interfaces/db.service.interface";
import { Page } from "../../../../types/pagable";
import init from "../../../../libs/firebase.admin.sdk";
import {Firestore} from 'firebase-admin/firestore'
import { getDocPath } from "../../../../utils/firebase-utils";
import { generateEntityId } from "../../../../utils/generate-ids";
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
                    method: 'firebase_db_service:find',
                    serverTime: new Date(),
                    path: 'n/a',
                    authorizationPresent: true,
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
    findPage<T>(page: Page, entity: string): Promise<EntityFetchedPageDto<Auditable & T>> {
        let query = this.firestore.collection(entity).limit(page.limit)
        if(page.start){
            /**
             * Try splitting the start value with = to check
             * if a custom field is being queried.
             * if not, default to _id
             */
            const [k,v] = (page.start as string).split(':')
            if(v){
                /**
                 * FIXME: This may be faulty
                 */
                query = query
                .orderBy(k)
                .startAt(v)
            }else{
                query = query
                .orderBy('_id')
                .startAt(page.start)
            }
        }
        return query
            .get()
            .then(data => {
                return {
                    method: 'firebase_db_service:findPage',
                    serverTime: new Date(),
                    path: 'n/a',
                    authorizationPresent: true,
                    data: {
                        current: page,
                        data: data.docs.map(doc=>doc.data()) as Array<Auditable &T>,
                    },

                } as EntityFetchedPageDto<Auditable & T>
            })
    }
    save<T>(data: T, entity: string, id?: string): Promise<EntityCreatedDto<Auditable & T>> {
        if(!id) id = generateEntityId(entity);
        return this.firestore.collection(entity).doc(id).create({
            _id: id,
            ...data
        })
        .then(()=>{
            return {
                method: 'firebase_db_service:save',
                serverTime: new Date(),
                path: 'n/a',
                authorizationPresent: true,
                data: data
            } as EntityCreatedDto<Auditable & T>
        })
        .catch(error => {
            throw new Error('Error Running Save on db')
        } )
    }
    update<T>(identifier: string, data: T, entity: string): Promise<EntityUpdatedDto<Auditable & T>> {
        return this.firestore.doc(getDocPath(entity,identifier)).update(data)
        .then(() => {
            return {
                method: 'firebase_db_service:save',
                serverTime: new Date(),
                path: 'n/a',
                authorizationPresent: true,
                data: {...data}
            } as EntityUpdatedDto<Auditable & T>
        })
    }
    delete<T>(identifier: string, entity: string): Promise<EntityDeletedDto<Auditable & T>> {
       return this.firestore.doc(getDocPath(entity,identifier)).delete()
       .then(()=>{
           return {
            method: 'firebase_db_service:save',
            serverTime: new Date(),
            path: 'n/a',
            authorizationPresent: true,
           } as EntityDeletedDto<Auditable & T>
       })
    }
    
}