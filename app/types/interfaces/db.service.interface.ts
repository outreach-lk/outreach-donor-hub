import User from "../../data/entities/user.entity";
import { Auditable } from "../auditable";
import { EntityCreatedDto, EntityDeletedDto, EntityFetchedDto, EntityFetchedPageDto, EntityUpdatedDto } from "../dtos/server-message.dtos";
import { Page } from "../pagable";

/**
 * Database Access Service for Node runtime.
 */
export interface IDatabaseService {
    authenticatedUser: User | null
    /** Get Methods */
    /**
     * Fetch an item of given entity type from the database.
     * @param identifier identifier of the item being fetched.
     * @param entity name of the entity in the database.
     * TODO: Infer entity type from the data being passed.
     */
    find<T>(identifier: string, entity: string): Promise<EntityFetchedDto<Auditable&T>>;
    /**
     * Fetch all items of a given entity type from the database.
     * @param entity name of the entity in the database.
     * TODO: Infer entity type from the data being passed.
     */
    findAll<T>(entity:string): Promise<EntityFetchedPageDto<Auditable & T[]>>;
    /**
     * fetch a paged sub-set of items of a given entity type from the database.
     * @param page the page of 
     * @param entity name of the entity in the database
     * TODO: Infer entity type from the data being passed.
     */
    findPage<T>(page: Page, entity:string, querymap?: Map<string,string|number>): Promise<EntityFetchedPageDto<Auditable & T>>;
    
    /** Query Methods */

    /** Create Methods */
    /**
     * creates a new item under a given type in the database.
     * @param data 
     * @param entity name of the entity in the database
     * @param id a pre-given id for the item being created. Use with caution.
     * TODO: Infer entity type from the data being passed.
     */
    save<T>(data: T, entity: string, id?: string): Promise<EntityCreatedDto<Auditable & T>>;

    /** Update Methods */
    /**
     * updates an item identified by an identifier under a given entity
     * with a new set of data.
     * @param identifier identifier of the item being updated
     * @param data data to update the item with. Strategy: merge with previous data.
     * @param entity name of the entity in the database.
     * TODO: Infer entity type from the data being passed.
     */
    update<T>(identifier: string, data: T, entity: string ): Promise<EntityUpdatedDto<Auditable & T>>;

    /** Delete Methods */
    /**
     * Deletes an item identified by an identifier under a given entity.
     * @param identifier identifier of the item being updated.
     * @param entity name of the entity in the databse.
     * TODO: Infer entity type from the data being passed.
     */
    delete<T>(identifier: string, entity: string): Promise<EntityDeletedDto<Auditable & T>>;
    
}