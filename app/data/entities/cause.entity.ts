/**
 * Cross Environment Data Access Object for Causes
**/

import { AuditableCauseDto, CauseCreatedDto, CauseDto, CauseUpdatedDto } from "../../types/dtos/cause.dtos";
import { FileDto } from "../../types/dtos/remote.file.dtos";
import { EntityCreatedDto, EntityFetchedDto } from "../../types/dtos/server.message.dtos";
import { Entity } from "../../types/enums/entities";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import CauseRepo from "../repos/cause.repo";
import BaseEntity from "./base.entity";
import User from "./user.dao";

export default class Cause extends BaseEntity<Cause,CauseDto>{
    title: string;
    description: string;
    attachments: FileDto[];
    
    constructor(causeDto:AuditableCauseDto){
        super(CauseRepo.getRepo(),Cause.map2Dto,causeDto.id);
        this.id = causeDto.id;
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
    };

    static map2Dto(cause:Cause):CauseDto {
        return {
            id: cause.id,
            title: cause.title,
            description: cause.description,
            attachments: cause.attachments,
            owner: cause.owner, // TODO: Map User to UserDTO
            permissions: cause.permissions,
            sharedWith: cause.sharedWith // Map Cause to CauseDTO
        } as CauseDto
    };

    /** Static CRUD Methods for GET and POST */
    /** 
     * Creates a Cause in the database with given data.
     * @param causeDto 
     * @returns 
     */
    static async create(causeDto: CauseDto):Promise<EntityCreatedDto<CauseDto>> {
        try {
            return await CauseRepo.getRepo().create(causeDto);
        } catch (error) {
            throw Error();
        }
    };

    /**
     * Fetches Cause with given identifier.
     * @param identifier 
     * @returns 
     */
    static async get(identifier: string): Promise<EntityFetchedDto<CauseDto>> {
        try{
            return await CauseRepo.getRepo().get(identifier);
        } catch (error){
            throw Error();
        }
    };



} 