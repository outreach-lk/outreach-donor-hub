import { Auditable } from "../auditable";
import { EntityCreatedDto } from "../dtos/server.message.dtos";
import { EntityDeletedDto } from "../dtos/server.message.dtos";
import { EntityUpdatedDto } from "../dtos/server.message.dtos";
import { EntityFetchedPageDto } from "../dtos/server.message.dtos";
import { EntityFetchedDto } from "../dtos/server.message.dtos";
import { Pagable, Page } from "../pagable";

export default interface ICRUDREPO<T> {
    /** Get Methods */
    get(identifier: string): Promise<EntityFetchedDto<Auditable&T>>;
    getAll(): Promise<EntityFetchedPageDto<Auditable & T[]>>;
    getPage(page: Page<T>): Promise<EntityFetchedPageDto<Auditable & T>>;
    
    /** Query Methods */

    /** Create Methods */
    create(data: T): Promise<EntityCreatedDto<Auditable & T>>;

    /** Update Methods */
    update(identifier: string, data: T): Promise<EntityUpdatedDto<Auditable & T>>;

    /** Delete Methods */
    delete(identifier: string): Promise<EntityDeletedDto<Audtiable & T>>;
}