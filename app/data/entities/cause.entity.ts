/**
 * Cross Environment Data Access Object for Causes
**/

import { AuditableCauseDto, CauseCreatedDto, CauseDto, CauseUpdatedDto } from "../../types/dtos/cause.dtos";
import { FileDto } from "../../types/dtos/remote.file.dtos";
import { Entity } from "../../types/enums/entities";
import CauseRepo from "../repos/cause.repo";
import BaseEntity from "./base.entity";
import User from "./user.dao";

export default class Cause extends BaseEntity{
    causeId?: string;
    owner?: User;
    title: string;
    description: string;
    attachments: FileDto[];
    private repo: CauseRepo = CauseRepo.getRepo();
    
    constructor(causeDto:AuditableCauseDto){
        super(Entity.CAUSE,causeDto.id);
        this.causeId = causeDto.id;
        this.owner = causeDto.owner?new User(causeDto.owner):undefined;
        this.title = causeDto.title
        this.description = causeDto.description
        this.attachments = causeDto?.attachments
        this.createdOn = causeDto.createdOn?causeDto.createdOn:null;
        this.createdBy = causeDto.createdBy?new User(causeDto.createdBy):undefined;
        this.updatedOn = causeDto.updatedOn;
        this.updatedBy = causeDto.updatedBy? new User(causeDto.updatedBy):undefined;
        this.permissions = causeDto.permissions;
        this.sharedWith = causeDto.sharedWith?.map(dto=>new User(dto));
    }

    static map2Dto(cause:Cause):CauseDto {
        return {
            id: cause.causeId,
            title: cause.title,
            description: cause.description,
            attachments: cause.attachments,
            owner: cause.owner, // TODO: Map User to UserDTO
            permissions: cause.permissions,
            sharedWith: cause.sharedWith // Map Cause to CauseDTO
        } as CauseDto
    }
    
    /** Introduce this to the Base Class as an abstract method */
    map2Dto():CauseDto{
        return Cause.map2Dto(this);
    }

    /**
     * Creates a Cause in the database with given data.
     * @param causeDto 
     * @returns 
     */
    static async create(causeDto: CauseDto):Promise<CauseCreatedDto> {
        try {
            return await CauseRepo.getRepo().create(causeDto);
        } catch (error) {
            throw Error();
        }
    }
    
    /**
     * Save the current local cause instance to the database.
     * To be used in the browser.
     * @todo May need to be converted to a multi environment method.
     * @returns AuditableCauseDto
     */
    async $browser_saveToDb(): Promise<CauseCreatedDto> {
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

    /** 
     * Update the Current Cause Instance in the Database 
     */
    async update(): Promise<CauseUpdatedDto> {
        if(this.causeId){
            try {
                return await this.repo.update(this.causeId,this.map2Dto());
            } catch (error) {
                throw new Error();
            }
        }else{
            // Throw Cause does not exist on db or invalid id.
            throw new Error();
        }
    }


} 