/**
 * Cross Environment Data Repositories for Causes.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
**/

import { Auditable } from "../../types/auditable";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { FileDto } from "../../types/dtos/remote-file.dtos";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../types/dtos/server-message.dtos";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";

export default class CauseRepo extends BaseRepo implements ICRUDREPO<CauseDto>{
    private static _instance:CauseRepo | null;
    
    constructor(){
        super();
    }
    get(identifier: string): Promise<EntityFetchedDto<Auditable & Ownable & CauseDto>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<EntityFetchedPageDto<Auditable & CauseDto[]>> {
        throw new Error("Method not implemented.");
    }
    getPage(page: Page<CauseDto>): Promise<EntityFetchedPageDto<Auditable & Ownable & CauseDto>> {
        throw new Error("Method not implemented.");
    }
    create(data: CauseDto): Promise<EntityCreatedDto<Auditable & Ownable & CauseDto>> {
        throw new Error("Method not implemented.");
    }
    update(identifier: string, data: CauseDto): Promise<EntityUpdatedDto<Auditable & Ownable & CauseDto>> {
        return Promise.resolve({data} as EntityUpdatedDto<Auditable & Ownable & CauseDto>);
    }
    delete(identifier: string): Promise<EntityDeletedDto<Auditable & Ownable & CauseDto >> {
        throw new Error("Method not implemented.");
    }

    /** Returns the repo instance. */
    static getRepo():CauseRepo {
        if(this._instance) {
            return this._instance;
        }else{
            return this._instance = new CauseRepo();
        }
    }

    

} 