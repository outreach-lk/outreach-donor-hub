import { Auditable } from "../auditable";
import { EntityCreatedDto, EntityDeletedDto, EntityFetchedDto, EntityFetchedPageDto, EntityUpdatedDto } from "../dtos/server-message.dtos";
import { Page } from "../pagable";

/**
 * Direct database access client for browsers where such access is allowed. (eg: Firestore)
 * When such access is unavailable still use a database client to call the REST APIs.
 * All database client providers should implement this interface.
 */
export interface IDatabaseClient {
    /** Get Methods */
    get<T>(identifier: string, entity: string): Promise<EntityFetchedDto<Auditable&T>>;
    getAll<T>(): Promise<EntityFetchedPageDto<Auditable & T[]>>;
    getPage<T>(page: Page): Promise<EntityFetchedPageDto<Auditable & T>>;
    
    /** Query Methods */

    /** Create Methods */
    create<T>(data: T, entity: string, id?: string): Promise<EntityCreatedDto<Auditable & T>>;

    /** Update Methods */
    update<T>(identifier: string, sdata: T): Promise<EntityUpdatedDto<Auditable & T>>;

    /** Delete Methods */
    delete<T>(identifier: string): Promise<EntityDeletedDto<Auditable & T>>;
    
}