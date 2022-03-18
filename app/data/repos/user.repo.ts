import { databaseClientFactory } from "../../api/clients";
import { Auditable } from "../../types/auditable";
import {
  EntityFetchedDto,
  EntityFetchedPageDto,
  EntityCreatedDto,
  EntityUpdatedDto,
  EntityDeletedDto,
} from "../../types/dtos/server-message.dtos";
import { UserDto, UserRole } from "../../types/dtos/user.dtos";
import { DatabaseProvider } from "../../types/enums/providers";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseClient } from "../../types/interfaces/db.client.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo";

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
    try {
        if(this.isBrowser) {
          throw new Error('Method not implemented');
        } else {
          return (this.db as IDatabaseService).find(identifier,this.entity);
        }
    } catch (error) {
        throw error;
    }
  }
  getAll(): Promise<EntityFetchedPageDto<Auditable & UserDto[]>> {
    throw new Error("Method not implemented.");
  }
  getPage(
    page: Page<UserDto>
  ): Promise<EntityFetchedPageDto<Auditable & UserDto>> {
    throw new Error("Method not implemented.");
  }
  /**
   * Creates a user on the database through direct client request.
   * Additional user verficiation may be done via back-end services.
   * @param data {UserDto}
   */
  create(data: UserDto): Promise<EntityCreatedDto<Auditable & UserDto>> {
    try {
      if (this.isBrowser) {
        // Cannot create elevated users from browser.
        if(data.role === UserRole.ADMIN || data.role === UserRole.MODERATOR){
          throw new Error('elevated users need to be created through admin action');
        }
        return (this.db as IDatabaseClient).create<UserDto>(
          {
            ...data,
          },
          this.entity,
          data.uid
        );
      } else {
        return (this.db as IDatabaseService).save(data, this.entity, data.uid);
      }
    } catch (error) {
      throw error;
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
