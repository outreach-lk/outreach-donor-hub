/**
 * Cross Environment Data Repositories for Donations.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
**/

import { Auditable } from "../../types/auditable";
import { DonationDto } from "../../types/dtos/donation.dtos";
import { FileDto } from "../../types/dtos/remote-file.dtos";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../types/dtos/server-message.dtos";
import { EventType } from "../../types/enums/events";
import { AuthProvider, DatabaseProvider } from "../../types/enums/providers";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import AppEvent from "../entities/event.entity";
import BaseRepo from "./base.repo";
import apiMap from "../../api/api-map.json";
import axios from "axios";
import { authClientFactory } from "../../api/clients";
import CauseRepo from "./cause.repo";
import Cause from "../entities/cause.entity";
import { CauseDto } from "../../types/dtos/cause.dtos";


export default class DonationRepo extends BaseRepo implements ICRUDREPO<DonationDto>{
    private static _instance:DonationRepo | null;
    private entity = 'donation'
    constructor(){
        super(DatabaseProvider.FIREBASE);
    }
    get(identifier: string): Promise<EntityFetchedDto<Auditable & Ownable & DonationDto>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<EntityFetchedPageDto<Auditable & DonationDto[]>> {
        throw new Error("Method not implemented.");
    }
    getPage(page: Page): Promise<EntityFetchedPageDto<Auditable & Ownable & DonationDto>> {
        throw new Error("Method not implemented.");
    }
    async create(data: DonationDto): Promise<EntityCreatedDto<Auditable & Ownable & DonationDto>> {
        if(this.isBrowser){
            let path = apiMap.v1["[entity]"].root
            .replace("[entity]", this.entity);
            const token = authClientFactory.getClient(
                AuthProvider.FIREBASE
              ).accessToken;
            return (await axios.post(path, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })).data.data;

        }else{
            if(data.causeId && data.ref && data.amount){
                try{
                    const _cause = await CauseRepo.getRepo().get(data.causeId);
                    const cause = new Cause(_cause.data as CauseDto);

                    return (this.db as IDatabaseService).save(data,this.entity)
                    .then(res => {
                        
                        AppEvent.create({
                            eventType: EventType.DONATION_CLAIM_CREATED,
                            topic: data.causeId,
                            message: `A Donation of ${data.amount} LKR was claimed.`
                        })
                        return res;
                    })
                } catch{
                    throw new Error('invalid cause id')
                }
            } else{
                throw new Error('invalid payload')
            }
        }
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