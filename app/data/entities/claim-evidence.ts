/* eslint-disable @typescript-eslint/unbound-method */
/**
 * Cross Environment Data Access Object for ClaimEvidences
**/

import { Auditable } from "../../types/auditable";
import { AuditableClaimEvidenceDto, ClaimEvidenceDto } from "../../types/dtos/claim-evidence";
import { FileDto } from "../../types/dtos/remote-file.dtos";
import { EntityCreatedDto, EntityFetchedDto, EntityFetchedPageDto } from "../../types/dtos/server-message.dtos";
import { Page } from "../../types/pagable";
import ClaimEvidenceRepo from "../repos/claim-evidence.repo";
import BaseEntity from "./base.entity";
import { IClaimEvidenceActions } from "../../types/interfaces/claimEvidence.entity.interface";
import { ClaimStatus } from "../../types/enums/status";
import { Ownable } from "../../types/ownable";

export default class ClaimEvidence extends BaseEntity<ClaimEvidence,ClaimEvidenceDto> implements IClaimEvidenceActions{

    // Define properties;
    attachments: FileDto
    status?: ClaimStatus
    constructor(ClaimEvidenceDto:AuditableClaimEvidenceDto){
        super(ClaimEvidenceRepo.getRepo(),ClaimEvidence.map2Dto);
        this._id = ClaimEvidenceDto.id;
        this.attachments = ClaimEvidenceDto.attachments;
        this.status = ClaimEvidenceDto.status;
        this.owner = ClaimEvidenceDto.owner
        this.createdOn = ClaimEvidenceDto.createdOn
        this.createdBy = ClaimEvidenceDto.createdBy
        this.updatedOn = ClaimEvidenceDto.updatedOn;
        this.updatedBy = ClaimEvidenceDto.updatedBy
        this.permissions = ClaimEvidenceDto.permissions;
        this.sharedWith = ClaimEvidenceDto.sharedWith
    }

    /** Static CRUD Methods for GET and POST */
    /** 
     * Creates a ClaimEvidence in the database with given data.
     * @param ClaimEvidenceDto 
     * @returns 
     */
    static async create(ClaimEvidenceDto: ClaimEvidenceDto):Promise<EntityCreatedDto<ClaimEvidenceDto>> {
        try {
            return ClaimEvidenceRepo.getRepo().create(ClaimEvidenceDto);
        } catch (error) {
            throw Error();
        }
    }

    /**
     * Fetches ClaimEvidence with given identifier.
     * @param identifier 
     * @returns 
     */
    static async get(identifier: string): Promise<EntityFetchedDto<ClaimEvidenceDto>> {
        try{
            return ClaimEvidenceRepo.getRepo().get(identifier);
        } catch (error){
            throw Error();
        }
    }

    /**
     * Fetches a page of ClaimEvidences
     * @param page 
     * @returns 
     */
    static async getPage(page: Page): Promise<EntityFetchedPageDto<ClaimEvidenceDto>> {
        try {
            return ClaimEvidenceRepo.getRepo().getPage(page);
        } catch (error) {
            throw Error();
        }
    }


    /** Mappers */
    /**
     * Maps ClaimEvidence to a ClaimEvidence DTO
     * @param ClaimEvidence 
     * @returns 
     */
    static map2Dto(entity:ClaimEvidence):ClaimEvidenceDto {
        return {
           id: entity.id,
           attachments: entity.attachments,
           status: entity.status,
           owner: entity.owner,
           permissions: entity.permissions,
           sharedWith: entity.sharedWith
        } as ClaimEvidenceDto
    }

    updateInstanceWithDto(d: Auditable & Ownable & { attachments: FileDto; status: ClaimStatus; }, e: ClaimEvidence): void {
        throw new Error("Method not implemented.");
    }

} 