/**
 * Cross Environment Data Repositories for Events.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
 **/

import { Auditable } from "../../types/auditable";
import { EventDto } from "../../types/dtos/event.dtos";
import {
  EntityCreatedDto,
  EntityDeletedDto,
  EntityFetchedDto,
  EntityFetchedPageDto,
  EntityUpdatedDto,
} from "../../types/dtos/server-message.dtos";
import { DatabaseProvider } from "../../types/enums/providers";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";
import apiMap from "../../api/api-map.json";
import axios from "axios";
import { queryMap2string } from "../../utils/parse-querystring";
import EventEmitter from "events";


export default class EventRepo extends BaseRepo implements ICRUDREPO<EventDto> {
  private static _instance: EventRepo | null;
  private entity = "event";
  public emitter = new EventEmitter()
  constructor() {
    super(DatabaseProvider.FIREBASE);
  }
  get(
    identifier: string
  ): Promise<EntityFetchedDto<Auditable & Ownable & EventDto>> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<EntityFetchedPageDto<Auditable & EventDto[]>> {
    throw new Error("Method not implemented.");
  }
  async getPage(
    page: Page,
    queryMap?: Map<string, string | number>,
  ): Promise<EntityFetchedPageDto<Auditable & Ownable & EventDto>> {
    if (this.isBrowser) {
      let path = apiMap.v1["[entity]"].root.replace("[entity]", this.entity) + '?';
      if(page.start){
          path = path.concat("&from=",String(page.start));
      }
      if(queryMap){
        path = path.concat("&query=",queryMap2string(queryMap))
      }
      try{
          return (await axios.get(path,{})).data.data
      } catch(error){
          throw error;
      }
    } else {
      return (this.db as IDatabaseService).findPage(
        page,
        this.entity,
        queryMap
      );
    }
  }
  create(
    data: EventDto,
  ): Promise<EntityCreatedDto<Auditable & Ownable & EventDto>> {
    if (this.isBrowser) {
      throw new Error("Method not allowed");
    } else {
      console.log("creating event");
      return (this.db as IDatabaseService).save(data, this.entity)
      .then(res=>{
        console.log(res.data?.eventType)
        this.emitter.emit(res.data?.eventType as string, res.data)
        return res;
      })
    }
  }
  update(
    identifier: string,
    data: EventDto
  ): Promise<EntityUpdatedDto<Auditable & Ownable & EventDto>> {
    return Promise.resolve({ data } as EntityUpdatedDto<
      Auditable & Ownable & EventDto
    >);
  }
  delete(
    identifier: string
  ): Promise<EntityDeletedDto<Auditable & Ownable & EventDto>> {
    throw new Error("Method not implemented.");
  }

  /** Returns the repo instance. */
  static getRepo(): EventRepo {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new EventRepo());
    }
  }
}
