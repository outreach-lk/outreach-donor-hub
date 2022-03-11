import { Auditable } from "../../../../types/auditable";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../../../types/dtos/server-message.dtos";
import { IDatabaseService } from "../../../../types/interfaces/db.service.interface";
import { Page } from "../../../../types/pagable";

export default class FirebaseDatabaseService implements IDatabaseService{
    private serverPrivateKey: string;
    constructor(key:string){
        this.serverPrivateKey = key;
    }

    find<T>(identifier: string, entity: string): Promise<EntityFetchedDto<Auditable & T>> {
        throw new Error("Method not implemented.");
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