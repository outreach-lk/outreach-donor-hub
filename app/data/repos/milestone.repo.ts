/**
 * Cross Environment Data Repositories for Causes.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
 **/

import { Auditable } from "../../types/auditable";
import { MilestoneDto } from "../../types/dtos/milestone.dtos";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../types/dtos/server-message.dtos";
import { EventType } from "../../types/enums/events";
import { AuthProvider, DatabaseProvider } from "../../types/enums/providers";
import { MilestoneStatus } from "../../types/enums/status";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import { SerializableBlock } from "../../ui/components/modules/wyswyg-editor";
import AppEvent from "../entities/event.entity";
import BaseRepo from "./base.repo";
import apiMap from "../../api/api-map.json";
import { authClientFactory } from "../../api/clients";
import axios from "axios";
import CauseRepo from "./cause.repo";
import { authServiceFactory } from "../../api/services";


export default class MilestoneRepo extends BaseRepo implements ICRUDREPO<MilestoneDto>{
    private static _instance: MilestoneRepo | null;
    private entity = "milestone";
    constructor() {
        super(DatabaseProvider.FIREBASE);
      }
    get(identifier: string): Promise<EntityFetchedDto<Auditable & Ownable & { causeId: string; title: string; description: SerializableBlock[]; status?: MilestoneStatus; }>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<EntityFetchedPageDto<Auditable & MilestoneDto[]>> {
        throw new Error("Method not implemented.");
    }
    getPage(page: Page, queryMap?: Map<string, string | number>): Promise<EntityFetchedPageDto<Auditable & Ownable & { causeId: string; title: string; description: SerializableBlock[]; status?: MilestoneStatus; }>> {
        throw new Error("Method not implemented.");
    }
    async create(data: MilestoneDto): Promise<EntityCreatedDto<Auditable & Ownable & { causeId: string; title: string; description: SerializableBlock[]; status?: MilestoneStatus; }>> {
        if(this.isBrowser){
          const path = apiMap.v1["[entity]"].root.replace("[entity]", this.entity);
          //FIXME move this to BaseRepo
          const token = authClientFactory.getClient(
            AuthProvider.FIREBASE
          ).accessToken;
          const causeData = (
            await axios({
              url: path,
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
              data,
            })
          ).data as EntityCreatedDto<Auditable & Ownable & MilestoneDto>;
          return causeData;
        }else{
          // if the environment is NODE
          const {data:cause} = await CauseRepo.getRepo().get(data.causeId);
          const user = await authServiceFactory.getService('',AuthProvider.FIREBASE).authenticatedUser;
          // check if the current user either the cause owner, or someone with whom the cause has been shared.
          if(user && (cause?.owner===user.uid || cause?.sharedWith?.includes(user.uid))){
            // assign the same share persmissions as the cause.
            data.sharedWith = cause.sharedWith;
            return (this.db as IDatabaseService).save(data,this.entity)
            .then(res=>{
              AppEvent.create({
                eventType: EventType.CAUSE_MILESTONE_CREATED,
                message: data.title,
                topic: data.causeId,
                payload: data
              })
              return res
            })
          }else{
            throw new Error('unauthorized');
          }
        }
    }
    update(identifier: string, sdata: MilestoneDto): Promise<EntityUpdatedDto<Auditable & Ownable & { causeId: string; title: string; description: SerializableBlock[]; status?: MilestoneStatus; }>> {
        throw new Error("Method not implemented.");
    }
    delete(identifier: string): Promise<EntityDeletedDto<Auditable & Ownable & { causeId: string; title: string; description: SerializableBlock[]; status?: MilestoneStatus; }>> {
        throw new Error("Method not implemented.");
    }
    
     /** Returns the repo instance. */
  static getRepo(): MilestoneRepo {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new MilestoneRepo());
    }
  }
}