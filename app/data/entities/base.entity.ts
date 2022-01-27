/** 
 * Parent Class for Cross Environment Data Entities 
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
*/

import { Auditable } from "../../types/auditable";
import { EntityCreatedDto, EntityDeletedDto, EntityFetchedDto, EntityFetchedPageDto, EntityUpdatedDto } from "../../types/dtos/server.message.dtos";
import { UserDto } from "../../types/dtos/user.dtos";
import { Entity } from "../../types/enums/entities";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { OwnablePermissions } from "../../types/ownable";
import { Page } from "../../types/pagable";
import MultiEnvEntity from "../multi.env.entity";
import BaseRepo from "../repos/base.repo";
import User from "./user.dao";

export default class BaseEntity<E,D> extends MultiEnvEntity{
    protected $serverIdentifier?: string; //TODO: Redundant?
    protected repo: ICRUDREPO<D>;
    private mapper: (e:E)=>D;
    id?: string;
    owner?: User;
    createdOn?: Date | null;
    createdBy?: User;
    updatedOn?: Date;
    updatedBy?: User;
    permissions?: OwnablePermissions;
    sharedWith?: User[];

    constructor(repo:ICRUDREPO<D>,mapper:(e:E)=>D,id?:string){
        super();
        this.$serverIdentifier = id; //TODO: Redundant?
        this.repo = repo;
        this.mapper = mapper;
    }

    /** CRUD Methods */
    create(mapper:(e:E)=>D):Promise<EntityCreatedDto<D>>{
        try {
            return this.repo.create(mapper(this));
        } catch (error) {
            throw Error();
        }
    }

    /** Server Exclusive Base Functions */
    /** Share Entity With Users*/
    $serverShareWith(users: UserDto[]){
        if(this.isNode){
            //TODO: Implement Sharing
            console.log(users);
        }else{
            throw new Error();
        }
    }
    /** Set Permissions on Object */
    $serverSetPermissions(permissions: OwnablePermissions):void{
        if(this.isNode){
            //TODO: Implement Permissios
            console.log(permissions);
        }else{
            throw new Error();
        }
    }


}