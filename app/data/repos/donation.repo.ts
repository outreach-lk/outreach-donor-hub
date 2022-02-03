/**
 * Cross Environment Data Repositories for Donations.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
**/

import { Auditable } from "../../types/auditable";
import { DonationDto } from "../../types/dtos/donation.dtos";
import { FileDto } from "../../types/dtos/remote.file.dtos";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../types/dtos/server.message.dtos";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";

export default class DonationRepo extends BaseRepo implements ICRUDREPO<DonationDto>{
    private static _instance:DonationRepo | null;
    
    constructor(){
        super();
    }
    get(identifier: string): Promise<EntityFetchedDto<Auditable & Ownable & DonationDto>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<EntityFetchedPageDto<Auditable & DonationDto[]>> {
        throw new Error("Method not implemented.");
    }
    getPage(page: Page<DonationDto>): Promise<EntityFetchedPageDto<Auditable & Ownable & DonationDto>> {
        throw new Error("Method not implemented.");
    }
    create(data: DonationDto): Promise<EntityCreatedDto<Auditable & Ownable & DonationDto>> {
        throw new Error("Method not implemented.");
    }
    update(identifier: string, data: DonationDto): Promise<EntityUpdatedDto<Auditable & Ownable & DonationDto>> {
        return Promise.resolve({data} as EntityUpdatedDto<Auditable & Ownable & DonationDto>);
    }
    delete(identifier: string): Promise<EntityDeletedDto<Auditable & Ownable & DonationDto >> {
        throw new Error("Method not implemented.");
    }

    /** Returns the repo instance. */
    static getRepo():DonationRepo {
        if(this._instance) {
            return this._instance;
        }else{
            return this._instance = new DonationRepo();
        }
    }

    

} 