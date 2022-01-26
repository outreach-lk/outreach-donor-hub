import { Auditable } from "../auditable";
import { Pagable, Page } from "../pagable";

export default interface ICRUDREPO<T> {
    /** Get Methods */
    get(identifier: string): Promise<Auditable & T>;
    getAll(): Promise<Auditable & T[]>;
    getPage(page: Page<T>): Promise<Pagable<Auditable & T>>;
    
    /** Query Methods */

    /** Create Methods */
    create(data: T): Promise<Auditable & T>;

    /** Update Methods */
    update(identifier: string, data: T): Promise<Auditable & T>;

    /** Delete Methods */
    delete(identifier: string): Auditable & T;
}