/**
 * Cross Environment Data Repositories for Causes.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
**/

import axios from "axios";
import { Auditable } from "../../types/auditable";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../types/dtos/server-message.dtos";
import { DatabaseProvider } from "../../types/enums/providers";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseClient } from "../../types/interfaces/db.client.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";
import apiMap from '../../api/api-map.json';

/**
 * Cause Data Access Repository
 * @version 1.0.0b uses Firebase as Provider
 */
export default class CauseRepo extends BaseRepo implements ICRUDREPO<CauseDto>{
    private static _instance:CauseRepo | null;
    private entity = 'cause'
    
    constructor(){
        super( DatabaseProvider.FIREBASE );
    }
    async get(identifier: string): Promise<EntityFetchedDto<Auditable & Ownable & CauseDto>> {
        if(this.isBrowser){
            const path = apiMap.v1["[entity]"]["[id]"].root
                .replace("[entity]",this.entity)
                .replace("[id]",identifier)
            return (await axios.get(path)).data as EntityFetchedDto< Auditable & Ownable & CauseDto>;
        }else {
            return (this.db as IDatabaseService).find(identifier,this.entity);
        }
    }
    getAll(): Promise<EntityFetchedPageDto<Auditable & CauseDto[]>> {
        throw new Error("Method not implemented.");
    }
    getPage(page: Page): Promise<EntityFetchedPageDto<Auditable & Ownable & CauseDto>> {
        if(this.isBrowser){
            throw new Error("Method not Implemented.");
        }else {
            return (this.db as IDatabaseService).findPage(page,this.entity);
        }
    }
    create(data: CauseDto): Promise<EntityCreatedDto<Auditable & Ownable & CauseDto>> {
        if (this.isBrowser) {
            // FIXME: Call the API instead
            return (this.db as IDatabaseClient).create<CauseDto>(
              {
                ...data,
              },
              this.entity,
            );
          } else {
            return (this.db as IDatabaseService).save(data, this.entity);
          }
    }
    update(identifier: string, data: CauseDto): Promise<EntityUpdatedDto<Auditable & Ownable & CauseDto>> {
        if(this.isBrowser){
            throw new Error('Method not implemented')
        } else {
            return (this.db as IDatabaseService).update(identifier,data,this.entity)
        }
    }
    delete(identifier: string): Promise<EntityDeletedDto<Auditable & Ownable & CauseDto >> {
        if(this.isBrowser){
            throw new Error('Method not implemented');
        }else {
            return (this.db as IDatabaseService).delete(identifier, this.entity);
        }
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