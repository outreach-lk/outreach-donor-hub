/** 
 * Parent Class for Cross Environment Data Access Objects 
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
*/

import { UserDto } from "../../types/dtos/user.dtos";
import { Entity } from "../../types/enums/entities";
import { OwnablePermissions } from "../../types/ownable";
import MultiEnvEntity from "../multi.env.entity";
import User from "./user.dao";

export default class BaseDAO extends MultiEnvEntity{
    // $serverSecret Use this key to authorize actions on entities in the server.
    private $serverSecret: string|null; 
    protected $serverIdentifier: string;
    protected $serverEntity: Entity;
    createdOn?: Date | null;
    createdBy?: User;
    updatedOn?: Date;
    updatedBy?: User;
    permissions?: OwnablePermissions;
    sharedWith?: User[];

    constructor(id:string, entity: Entity){
        super();
        this.$serverIdentifier = id;
        this.$serverEntity = entity;
        this.$serverSecret = process.env.SERVER_SECRET || null; // Assign from environment
    }

    /** Server Exclusive Base Functions */
    /** Share */
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