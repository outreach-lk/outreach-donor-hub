/** 
 * Parent Class for Cross Environment Data Entities 
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
*/

import { EntityCreatedDto } from "../../types/dtos/server.message.dtos";
import { UserDto } from "../../types/dtos/user.dtos";
import { Entity } from "../../types/enums/entities";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { OwnablePermissions } from "../../types/ownable";
import MultiEnvEntity from "../multi.env.entity";
import User from "./user.dao";

export default class BaseEntity<D> extends MultiEnvEntity{
    // $serverSecret Use this key to authorize actions on entities in the server.
    private $serverSecret: string|null; 
    protected $serverIdentifier?: string;
    protected $serverEntity: Entity;
    protected repo: ICRUDREPO;
    createdOn?: Date | null;
    createdBy?: User;
    updatedOn?: Date;
    updatedBy?: User;
    permissions?: OwnablePermissions;
    sharedWith?: User[];

    constructor(entity: Entity,id?:string,){
        super();
        this.$serverIdentifier = id;
        this.$serverEntity = entity;
        this.$serverSecret = process.env.SERVER_SECRET || null; // Assign from environment   
    }

    /** Entity CRUD Methods */
    /**
     * Save the current local cause instance to the database.
     * To be used in the browser.
     * @todo May need to be converted to a multi environment method.
     * @returns AuditableCauseDto
     */
     async create(): Promise<EntityCreatedDto<D>> {
        if(this.causeId){
            // Do not allow creating 
            throw Error(); 
        }else if(this.isBrowser){
            try {
                return await this.repo.create({
                    title: this.title,
                    description: this.description,
                    attachments: this.attachments
                });
            } catch (error) {
                throw Error();
            }
        }else{
            // Throw Environment Does Not Support this method.
            throw Error();
        }
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