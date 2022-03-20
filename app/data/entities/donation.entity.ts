/* eslint-disable @typescript-eslint/unbound-method */
/**
 * Cross Environment Data Access Object for Donations
**/

import { Auditable } from "../../types/auditable";
import { AuditableDonationDto, DonationDto } from "../../types/dtos/donation.dtos";
import { EntityCreatedDto, EntityFetchedDto, EntityFetchedPageDto } from "../../types/dtos/server-message.dtos";
import { Page } from "../../types/pagable";
import DonationRepo from "../repos/donation.repo";
import BaseEntity from "./base.entity";
import { IDonationActions } from "../../types/interfaces/donation.entity.interface";
import Cause from "./cause.entity";
import { DonationStatus } from "../../types/enums/status";
import ClaimEvidence from "./claim-evidence";
import { Ownable } from "../../types/ownable";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { ClaimEvidenceDto } from "../../types/dtos/claim-evidence";

export default class Donation extends BaseEntity<Donation,DonationDto> implements IDonationActions{

    // Define properties;
    cause?: Cause;
    amount: number
    note: string
    evidence: ClaimEvidence[]
    status: DonationStatus
    constructor(DonationDto:AuditableDonationDto){
        super(DonationRepo.getRepo(),Donation.map2Dto);
        this._id = DonationDto.id;
        this.amount = DonationDto.amount;
        this.note = DonationDto.note;
        this.evidence = DonationDto.evidence?.map(e=>new ClaimEvidence(e));
        this.status = DonationDto.status;
        this.owner = DonationDto.owner
        this.createdOn = DonationDto.createdOn?DonationDto.createdOn:null;
        this.createdBy = DonationDto.createdBy;
        this.updatedOn = DonationDto.updatedOn;
        this.updatedBy = DonationDto.updatedBy;
        this.permissions = DonationDto.permissions;
        this.sharedWith = DonationDto.sharedWith;
    }

    /** Static CRUD Methods for GET and POST */
    /** 
     * Creates a Donation in the database with given data.
     * @param DonationDto 
     * @returns 
     */
    static async create(DonationDto: DonationDto):Promise<EntityCreatedDto<DonationDto>> {
        try {
            return DonationRepo.getRepo().create(DonationDto);
        } catch (error) {
            throw Error();
        }
    }

    /**
     * Fetches Donation with given identifier.
     * @param identifier 
     * @returns 
     */
    static async get(identifier: string): Promise<EntityFetchedDto<DonationDto>> {
        try{
            return DonationRepo.getRepo().get(identifier);
        } catch (error){
            throw Error();
        }
    }

    /**
     * Fetches a page of Donations
     * @param page 
     * @returns 
     */
    static async getPage(page: Page<DonationDto>): Promise<EntityFetchedPageDto<DonationDto>> {
        try {
            return DonationRepo.getRepo().getPage(page);
        } catch (error) {
            throw Error();
        }
    }


    /** Mappers */
    /**
     * Maps Donation to a Donation DTO
     * @param Donation 
     * @returns 
     */
    static map2Dto(Donation:Donation):DonationDto {
        return {
           
        } as DonationDto
    }

    mapInstanceToDto(dto: Auditable & Ownable & { cause: CauseDto; amount: number; note: string; evidence: ClaimEvidenceDto[]; status: DonationStatus; }, entity: Donation): void {
        throw new Error("Method not implemented.");
    }

    

} 