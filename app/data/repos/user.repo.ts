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
import axios from "axios";


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
  get(identifier: string): Promise<EntityFetchedDto<Auditable & UserDto>> {
      if(this.isBrowser) {
        throw new Error('Method not implemented');
      } else {
        return (this.db as IDatabaseService).find(identifier,this.entity);
      }
  }
  getAll(): Promise<EntityFetchedPageDto<Auditable & UserDto[]>> {
    throw new Error("Method not implemented.");
  }
  getPage(
    page: Page
  ): Promise<EntityFetchedPageDto<Auditable & UserDto>> {
    throw new Error("Method not implemented.");
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
    throw new Error("Method not implemented.");
  }
  delete(identifier: string): Promise<EntityDeletedDto<Auditable & UserDto>> {
    throw new Error("Method not implemented.");
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
