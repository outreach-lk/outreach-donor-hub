/* eslint-disable @typescript-eslint/unbound-method */
/**
 * Cross Environment Data Access Object for Donations
 **/

import { Auditable } from "../../types/auditable";
import {
  AuditableDonationDto,
  DonationDto,
} from "../../types/dtos/donation.dtos";
import {
  EntityCreatedDto,
  EntityFetchedDto,
  EntityFetchedPageDto,
} from "../../types/dtos/server-message.dtos";
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
import CauseRepo from "../repos/cause.repo";

export default class Donation
  extends BaseEntity<Donation, DonationDto>
  implements IDonationActions
{
  // Define properties;
  ref: string;
  causeId: string;
  amount: number;
  note?: string;
  evidence?: ClaimEvidence[];
  status?: DonationStatus;
  constructor(DonationDto: AuditableDonationDto) {
    super(DonationRepo.getRepo(), Donation.map2Dto);
    this._id = DonationDto.id;
    this.ref = DonationDto.ref;
    this.causeId = DonationDto.causeId;
    this.amount = DonationDto.amount;
    this.note = DonationDto.note;
    this.evidence = DonationDto.evidence?.map((e) => new ClaimEvidence(e));
    this.status = DonationDto.status || DonationStatus.CLAIMED;
    this.owner = DonationDto.owner;
    this.createdOn = DonationDto.createdOn ? DonationDto.createdOn : null;
    this.createdBy = DonationDto.createdBy;
    this.updatedOn = DonationDto.updatedOn;
    this.updatedBy = DonationDto.updatedBy;
    this.permissions = DonationDto.permissions;
    this.sharedWith = DonationDto.sharedWith;
  }

  public confirmDonationClaim() {
    this.status = DonationStatus.ACKNOWLEDGED;
    return this.update();
  }

  public disputeDonationClaim() {
    this.status = DonationStatus.DISPUTED;
    return this.update();
  }

  updateInstanceWithDto(
    dto: Auditable &
      Ownable & {
        ref: string;
        causeId: string;
        amount: number;
        note?: string | undefined;
        evidence?: ClaimEvidenceDto[] | undefined;
        status?: DonationStatus | undefined;
      },
    entity: Donation
  ): void {
    entity.id = dto.id || entity.id;
    entity.status = dto.status || entity.status;
  }

  /** Static CRUD Methods for GET and POST */
  /**
   * Creates a Donation in the database with given data.
   * @param DonationDto
   * @returns
   */
  static async create(
    DonationDto: DonationDto
  ): Promise<EntityCreatedDto<DonationDto>> {
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
    try {
      return DonationRepo.getRepo().get(identifier);
    } catch (error) {
      throw Error();
    }
  }

  /**
   * Fetches a page of Donations
   * @param page
   * @returns
   */
  static async getPage(page: Page): Promise<EntityFetchedPageDto<DonationDto>> {
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
  static map2Dto(Donation: Donation): DonationDto {
    return {
      id: Donation.id,
      amount: Donation.amount,
      causeId: Donation.causeId,
      ref: Donation.ref,
      evidence: Donation.evidence,
      note: Donation.note,
      owner: Donation.owner,
      permissions: Donation.permissions,
      sharedWith: Donation.sharedWith,
      status: Donation.status,
    } as DonationDto;
  }
}
