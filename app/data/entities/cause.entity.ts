/**
 * Cross Environment Data Access Object for Causes
**/

import { Auditable } from "../../types/auditable";
import { AuditableCauseDto, CauseDto } from "../../types/dtos/cause.dtos";
import { FileDto } from "../../types/dtos/remote.file.dtos";
import { EntityCreatedDto, EntityFetchedDto, EntityFetchedPageDto } from "../../types/dtos/server.message.dtos";
import { Page } from "../../types/pagable";
import CauseRepo from "../repos/cause.repo";
import BaseEntity from "./base.entity";
import User from "./user.dao";

export default class Cause extends BaseEntity<Cause,CauseDto>{
    title: string;
    description: string;
    attachments: FileDto[];
    
    constructor(causeDto:AuditableCauseDto){
        // eslint-disable-next-line @typescript-eslint/unbound-method
        super(CauseRepo.getRepo(),Cause.map2Dto,Cause.mapFromDto);
        this._id = causeDto.id;
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

    /** Static CRUD Methods for GET and POST */
    /** 
     * Creates a Cause in the database with given data.
     * @param causeDto 
     * @returns 
     */
    static async create(causeDto: CauseDto):Promise<EntityCreatedDto<CauseDto>> {
        try {
            return CauseRepo.getRepo().create(causeDto);
        } catch (error) {
            throw Error();
        }
    }

    /**
     * Fetches Cause with given identifier.
     * @param identifier 
     * @returns 
     */
    static async get(identifier: string): Promise<EntityFetchedDto<CauseDto>> {
        try{
            return CauseRepo.getRepo().get(identifier);
        } catch (error){
            throw Error();
        }
    }

    /**
     * Fetches a page of Causes
     * @param page 
     * @returns 
     */
    static async getPage(page: Page<CauseDto>): Promise<EntityFetchedPageDto<CauseDto>> {
        try {
            return CauseRepo.getRepo().getPage(page);
        } catch (error) {
            throw Error();
        }
    }

    /**
     * Maps Cause to a Cause DTO
     * @param cause 
     * @returns 
     */
    static map2Dto(cause:Cause):CauseDto {
        return {
            id: cause._id,
            title: cause.title,
            description: cause.description,
            attachments: cause.attachments,
            owner: cause.owner, // TODO: Map User to UserDTO
            permissions: cause.permissions,
            sharedWith: cause.sharedWith // Map Cause to CauseDTO
        } as CauseDto
    }

    /**
     * Maps a dto to an instance 
     * @param dto 
     * @param cause 
     */
    static mapFromDto(dto: Auditable & CauseDto,cause: Cause):void{
        cause.id = dto.id || cause.id;
        cause.title = dto.title || cause.title;
        cause.description = dto.description || cause.description;
        cause.attachments = dto.attachments || cause.attachments;
        cause.owner = dto.owner? new User(dto.owner): cause.owner
        cause.createdOn = dto.createdOn || cause.createdOn;
        cause.createdBy = dto.createdBy? new User(dto.createdBy): cause.createdBy;
        cause.updatedOn = dto.updatedOn || cause.updatedOn;
        cause.updatedBy = dto.updatedBy? new User(dto.updatedBy): cause.updatedBy;
        cause.isDeleted = dto.isDeleted || cause.isDeleted;
        cause.deletedOn =  dto.deletedOn || cause.deletedOn;
        cause.deletedBy = dto.deletedBy? new User(dto.deletedBy): cause.deletedBy;
        cause.permissions = dto.permissions || cause.permissions;
        cause.sharedWith = dto.sharedWith? dto.sharedWith?.map(dto=>new User(dto)): cause.sharedWith;
    }

} 