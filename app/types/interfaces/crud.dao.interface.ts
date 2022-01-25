import { Auditable } from "../auditable";
import { Pagable, Page } from "../pagable";

export default interface ICRUDDAO<T> {
    /** Get Methods */
    get(identifier: string): Auditable & T;
    getAll(): Auditable & T[];
    getPage(page: Page<T>): Pagable<Auditable & T>
    
    /** Query Methods */

    /** Create Methods */
    create(data: T): Auditable & T;

    /** Update Methods */
    update(identifier: string, data: T): Auditable & T;

    /** Delete Methods */
    delete(identifier: string): Auditable & T;
}