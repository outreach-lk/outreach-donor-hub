import { Auditable } from "../../types/auditable";
import {
  EntityFetchedDto,
  EntityFetchedPageDto,
  EntityCreatedDto,
  EntityUpdatedDto,
  EntityDeletedDto,
} from "../../types/dtos/server-message.dtos";
import { UserDto, UserRole } from "../../types/dtos/user.dtos";
import { AuthProvider, DatabaseProvider } from "../../types/enums/providers";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseClient } from "../../types/interfaces/db.client.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";
import apiMap from "../../api/api-map.json";
import { authClientFactory } from "../../api/clients";
import axios, { AxiosError } from "axios";
import { queryMap2string } from "../../utils/parse-querystring";


/**
 * User Data access repository
 * @version 1.0.0b uses Firebase as the database provider.
 */
export default class UserRepo extends BaseRepo implements ICRUDREPO<UserDto> {
  private static _instance: UserRepo | null;
  private entity = "user";

  constructor() {
    super(DatabaseProvider.FIREBASE);
  }
  

  /**
   * Find user by userid.
   * @param {string} userid 
   */
  async get(identifier: string): Promise<EntityFetchedDto<Auditable & UserDto>> {
      if(this.isBrowser) {
        const path = apiMap.v1["[entity]"]["[id]"].root
        .replace("[entity]", this.entity)
        .replace("[id]", identifier);
      
      return (await axios.get(path)).data as EntityFetchedDto<Auditable & UserDto>
      } else {
        try{
          return (this.db as IDatabaseService).find(identifier,this.entity);
        }catch{
          throw new Error('Error fetching user')
        }
      }
  }
  getAll(): Promise<EntityFetchedPageDto<Auditable & UserDto[]>> {
    throw new Error("Method not implemented.");
  }
  async getPage(
    page: Page,
    queryMap?: Map<string, string | number>
  ): Promise<EntityFetchedPageDto<Auditable & UserDto>> {
      if(this.isBrowser){
        let path = apiMap.v1["[entity]"].root
        .replace("[entity]", this.entity)
        .concat("?", "limit=", page.limit.toString());
      if (page.start) {
        path = path.concat("&from=", String(page.start));
      }
      if (queryMap) {
        path = path.concat("&query=", queryMap2string(queryMap));
      }
      try {
        return (await axios.get(path, {})).data.data;
      } catch (error) {
        throw error;
      }
      }else{
        return (this.db as IDatabaseService).findPage(
          page,
          this.entity,
          queryMap
        );
      }
  }
  /**
   * Creates a user on the database through direct client request.
   * Additional user verficiation may be done via back-end services.
   * @param data {UserDto}
   */
  async create(data: UserDto): Promise<EntityCreatedDto<Auditable & UserDto>> {
      if (this.isBrowser) {
        let path = apiMap.v1.auth["sign-up"].root
        const token = authClientFactory.getClient(
          AuthProvider.FIREBASE
        ).accessToken;
        return (await axios.post(path, data, {
          headers:{
            authorization: `Bearer ${token}`
          }
        })).data
      } else {
        return (this.db as IDatabaseService).save(data, this.entity, 'user-'+data.uid);
      }
  }
  update(
    identifier: string,
    data: UserDto
  ): Promise<EntityUpdatedDto<Auditable & UserDto>> {
    if(this.isBrowser){
      throw new Error("Method not implemented.");
    }else{
      return (this.db as IDatabaseService).update(
        identifier,
        data,
        this.entity
      ).catch(error=>{
        throw error;
      })
    }
  }
  delete(identifier: string): Promise<EntityDeletedDto<Auditable & UserDto>> {
    throw new Error("Method not implemented.");
  }

  /**
   * changes a user's role
   * only to be used by mods and admins
   * @param uid 
   * @param role 
   */
  async $browserElevateUser(uid:string,targetRole:UserRole): Promise<any>{
    let path = apiMap.v1.rpc.user.elevate.path;
    const token = authClientFactory.getClient(AuthProvider.FIREBASE).accessToken
    try{
      return (await axios.put(path,{uid,targetRole},{
        headers:{
          authorization: `Bearer ${token}`
        }
      })).data
    }catch(error){
      let message;
      try{
        message  = JSON.parse((error as AxiosError).request?.response).error;
      }catch{
        message = error
      }
      throw message
    }
  }

  /** Returns the repo instance. */
  static getRepo(): UserRepo {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new UserRepo());
    }
  }
}
