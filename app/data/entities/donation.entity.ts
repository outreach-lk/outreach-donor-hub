/**
 * Cross Environment Data Access Object for Donations
**/

import { Auditable } from "../../types/auditable";
import { AuditableDonationDto, DonationDto } from "../../types/dtos/donation.dtos";
import { FileDto } from "../../types/dtos/remote.file.dtos";
import { EntityCreatedDto, EntityFetchedDto, EntityFetchedPageDto } from "../../types/dtos/server.message.dtos";
import { Page } from "../../types/pagable";
import DonationRepo from "../repos/donation.repo";
import BaseEntity from "./base.entity";
import { IDonationActions } from "../../types/interfaces/donation.entity.interface";
import User from "./user.dao";
import Cause from "./cause.entity";
import { DonationStatus } from "../../types/enums/status";
import ClaimEvidence from "./claimEvidence.entity";

export default class Donation extends BaseEntity<Donation,DonationDto> implements IDonationActions{
    // Define properties;
    cause: Cause;
    amount: number
    note: string
    evidence: ClaimEvidence[]
    status: DonationStatus
    constructor(DonationDto:AuditableDonationDto){
        // eslint-disable-next-line @typescript-eslint/unbound-method
        super(DonationRepo.getRepo(),Donation.map2Dto,Donation.mapFromDto);
        this._id = DonationDto.id;
        this.cause = DonationDto.cause;
        this.amount = DonationDto.amount;
        this.note = DonationDto.note;
        this.evidence = DonationDto.evidence;
        this.status = DonationDto.status;
        this.owner = DonationDto.owner?new User(DonationDto.owner):undefined;
        this.createdOn = DonationDto.createdOn?DonationDto.createdOn:null;
        this.createdBy = DonationDto.createdBy?new User(DonationDto.createdBy):undefined;
        this.updatedOn = DonationDto.updatedOn;
        this.updatedBy = DonationDto.updatedBy? new User(DonationDto.updatedBy):undefined;
        this.permissions = DonationDto.permissions;
        this.sharedWith = DonationDto.sharedWith?.map(dto=>new User(dto));
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

    /**
     * Maps a dto to an instance 
     * @param dto 
     * @param Donation 
     */
    static mapFromDto(dto: Auditable & DonationDto,Donation: Donation):void{
        throw new Error("Not Implemented");
    }

} 