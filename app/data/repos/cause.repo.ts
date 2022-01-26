/**
 * Cross Environment Data Repositories for Causes.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
**/

import { Auditable } from "../../types/auditable";
import { CauseDto } from "../../types/dtos/cause.dtos";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { Pagable, Page } from "../../types/pagable";
import BaseRepo from "./base.repo";

export default class CauseRepo extends BaseRepo implements ICRUDREPO<CauseDto>{
    private static _instance:CauseRepo | null;

    constructor(){
        super();
    }

    static getRepo():CauseRepo {
        if(this._instance) {
            return this._instance;
        }else{
            return this._instance = new CauseRepo();
        }
    }

    get(identifier: string): Promise<Auditable & CauseDto> {
        if(this.isBrowser){
            /** Get item from Client */
        }else{
            /** Get item from Server */
        }
    }
    getAll(): Promise<Auditable & CauseDto[]> {
        if(this.isBrowser){
            /** Get items from Client */
        }else{
            /** Get items from Server */
        }
    }
    getPage(page: Page<CauseDto>): Promise<Pagable<Auditable & CauseDto>> {
        if(this.isBrowser){
            /** Get pages from Client */
        }else{
            /** Get pages from Server */
        }
    }
    create(data: CauseDto): Promise<Auditable & CauseDto> {
        if(this.isBrowser){
            /** Create item from Client */
        }else{
            /** Create item from Server */
        }
    }
    update(identifier: string, data: CauseDto): Promise<Auditable & CauseDto> {
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