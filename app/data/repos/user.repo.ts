import { Auditable } from "../../types/auditable";
import { EntityFetchedDto, EntityFetchedPageDto, EntityCreatedDto, EntityUpdatedDto, EntityDeletedDto } from "../../types/dtos/server.message.dtos";
import { UserDto } from "../../types/dtos/user.dtos";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { Page } from "../../types/pagable";
import BaseRepo from "./base.repo"

export default class UserRepo extends BaseRepo implements ICRUDREPO<UserDto> {
    private static _instance: UserRepo | null;
    
    get(identifier: string): Promise<EntityFetchedDto<Auditable & UserDto>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<EntityFetchedPageDto<Auditable & UserDto[]>> {
        throw new Error("Method not implemented.");
    }
    getPage(page: Page<UserDto>): Promise<EntityFetchedPageDto<Auditable & UserDto>> {
        throw new Error("Method not implemented.");
    }
    create(data: UserDto): Promise<EntityCreatedDto<Auditable & UserDto>> {
        throw new Error("Method not implemented.");
    }
    update(identifier: string, data: UserDto): Promise<EntityUpdatedDto<Auditable & UserDto>> {
        throw new Error("Method not implemented.");
    }
    delete(identifier: string): Promise<EntityDeletedDto<Auditable & UserDto>> {
        throw new Error("Method not implemented.");
    }
    
    /** Returns the repo instance. */
    static getRepo():UserRepo {
        if(this._instance) {
            return this._instance;
        }else{
            return this._instance = new UserRepo();
        }
    }
}