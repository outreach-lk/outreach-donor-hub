/**
 * Cross Environment Data Repositories for ClaimEvidences.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
**/

import { Auditable } from "../../types/auditable";
import { ClaimEvidenceDto } from "../../types/dtos/claim-evidence";
import { FileDto } from "../../types/dtos/remote-file.dtos";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../types/dtos/server-message.dtos";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";

export default class ClaimEvidenceRepo extends BaseRepo implements ICRUDREPO<ClaimEvidenceDto>{
    private static _instance:ClaimEvidenceRepo | null;
    
    constructor(){
        super();
    }
    get(identifier: string): Promise<EntityFetchedDto<Auditable & Ownable & ClaimEvidenceDto>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<EntityFetchedPageDto<Auditable & ClaimEvidenceDto[]>> {
        throw new Error("Method not implemented.");
    }
    getPage(page: Page<ClaimEvidenceDto>): Promise<EntityFetchedPageDto<Auditable & Ownable & ClaimEvidenceDto>> {
        throw new Error("Method not implemented.");
    }
    create(data: ClaimEvidenceDto): Promise<EntityCreatedDto<Auditable & Ownable & ClaimEvidenceDto>> {
        throw new Error("Method not implemented.");
    }
    update(identifier: string, data: ClaimEvidenceDto): Promise<EntityUpdatedDto<Auditable & Ownable & ClaimEvidenceDto>> {
        return Promise.resolve({data} as EntityUpdatedDto<Auditable & Ownable & ClaimEvidenceDto>);
    }
    delete(identifier: string): Promise<EntityDeletedDto<Auditable & Ownable & ClaimEvidenceDto >> {
        throw new Error("Method not implemented.");
    }

    /** Returns the repo instance. */
    static getRepo():ClaimEvidenceRepo {
        if(this._instance) {
            return this._instance;
        }else{
            return this._instance = new ClaimEvidenceRepo();
        }
    }

    

} 