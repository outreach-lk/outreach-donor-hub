/**
 * Cross Environment Data Access Objects for Causes.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
**/

import { Auditable } from "../../types/auditable";
import { CauseDto } from "../../types/dtos/cause.dtos";
import ICRUDDAO from "../../types/interfaces/crud.repo.interface";
import { Pagable, Page } from "../../types/pagable";
import BaseRepo from "./base.repo";

export default class Cause extends BaseRepo implements ICRUDDAO<CauseDto>{
    constructor(){
        super();
    }

    get(identifier: string): Auditable & CauseDto {
        if(this.isBrowser){
            /** Get item from Client */
        }else{
            /** Get item from Server */
        }
    }
    getAll(): Auditable & CauseDto[] {
        if(this.isBrowser){
            /** Get items from Client */
        }else{
            /** Get items from Server */
        }
    }
    getPage(page: Page<CauseDto>): Pagable<Auditable & CauseDto> {
        if(this.isBrowser){
            /** Get pages from Client */
        }else{
            /** Get pages from Server */
        }
    }
    create(data: CauseDto): Auditable & CauseDto {
        if(this.isBrowser){
            /** Create item from Client */
        }else{
            /** Create item from Server */
        }
    }
    update(identifier: string, data: CauseDto): Auditable & CauseDto {
        if(this.isBrowser){
            /** Update item from Client */
        }else{
            /** Update item from Server */
        }
    }
    delete(identifier: string): Auditable & CauseDto {
        if(this.isBrowser){
            /** Delete item from Client */
        }else{
            /** Delete item from Server */
        }
    }

} 