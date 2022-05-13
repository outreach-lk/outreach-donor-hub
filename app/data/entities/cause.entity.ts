/* eslint-disable @typescript-eslint/unbound-method */
/**
 * Cross Environment Data Access Object for Causes
 **/

import { Auditable } from "../../types/auditable";
import { AuditableCauseDto, CauseDto } from "../../types/dtos/cause.dtos";
import { FileDto } from "../../types/dtos/remote-file.dtos";
import {
  EntityCreatedDto,
  EntityFetchedDto,
  EntityFetchedPageDto,
} from "../../types/dtos/server-message.dtos";
import { Page } from "../../types/pagable";
import CauseRepo from "../repos/cause.repo";
import BaseEntity from "./base.entity";
import { ICauseActions } from "../../types/interfaces/cause.entity.interface";
import Donation from "./donation.entity";
import { BankAccountDetails } from "../../types/dtos/bank-details.dto";
import { Currency } from "../../types/enums/currency";
import { SerializableBlock } from "../../ui/components/modules/wyswyg-editor";
import { VerificationStatus } from "../../types/enums/status";

export default class Cause
  extends BaseEntity<Cause, CauseDto>
  implements ICauseActions
{
  title: string;
  description: SerializableBlock[];
  attachments: FileDto[]; // TODO: Convert to File Objects
  donations?: Donation[]; //TODO: 1.Create Donations 2. Should this rather be a Pagable of type Donation?
  currentCollection: {
    acknowledged: number,
    pending: number
};
  target?: number;
  currency?: Currency;
  expiryDate?: Date;
  bankAccount: BankAccountDetails
  status?: VerificationStatus;
  isVerified?: boolean;
  constructor(causeDto: AuditableCauseDto) {
    super(CauseRepo.getRepo(), Cause.map2Dto);
    this._id = causeDto.id;
    this.owner = causeDto.owner;
    this.title = causeDto.title;
    this.description = causeDto.description;
    this.attachments = causeDto?.attachments;
    this.donations = causeDto.donations?.map((dto) => new Donation(dto));
    this.currentCollection = causeDto.currentCollection || {acknowledged:0, pending:0}
    this.target = causeDto.target;
    this.currency = causeDto.currency;
    this.expiryDate = causeDto.expiry;
    this.createdOn = causeDto.createdOn ? causeDto.createdOn : null;
    this.createdBy = causeDto.createdBy;
    this.updatedOn = causeDto.updatedOn;
    this.updatedBy = causeDto.updatedBy;
    this.permissions = causeDto.permissions;
    this.sharedWith = causeDto.sharedWith;
    this.bankAccount = causeDto.bankAccount
    this.status = causeDto.verificationStatus || VerificationStatus.UNKNOWN
    this.isVerified = causeDto.isVerified || false

  }

  $browser_UploadCauseAttachments(
    files: FileDto[]
  ): Promise<[Auditable & FileDto]> {
    throw new Error("Method not implemented.");
  }

  /** Static CRUD Methods for GET and POST */
  /**
   * Creates a Cause in the database with given data.
   * @param causeDto
   * @returns
   */
  static async create(causeDto: CauseDto): Promise<EntityCreatedDto<CauseDto>> {
    try {
      return CauseRepo.getRepo().create(causeDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches Cause with given identifier.
   * @param identifier
   * @returns
   */
  static async get(identifier: string): Promise<EntityFetchedDto<CauseDto>> {
    try {
      return CauseRepo.getRepo().get(identifier);
    } catch (error) {
      throw Error();
    }
  }

  /**
   * Fetches a page of Causes
   * @param page
   * @returns
   */
  static async getPage(page: Page): Promise<EntityFetchedPageDto<CauseDto>> {
    try {
      return CauseRepo.getRepo().getPage(page);
    } catch (error) {
      throw Error();
    }
  }

  /** Mappers */
  /**
   * Maps Cause to a Cause DTO
   * @param cause
   * @returns
   */
  static map2Dto(cause: Cause): CauseDto {
    return {
      id: cause._id,
      title: cause.title,
      description: cause.description,
      attachments: cause.attachments,
      donations: cause.donations
        ? cause.donations.map((don) => Donation.map2Dto(don))
        : [],
      currentCollection: cause.currentCollection,
      target: cause.target,
      currency: cause.currency,
      expiry: cause.expiryDate,
      bankAccount: cause.bankAccount,
      owner: cause.owner, // TODO: Map User to UserDTO
      permissions: cause.permissions,
      sharedWith: cause.sharedWith, // Map Cause to CauseDTO
      verificationStatus: cause.status,
      isVerified: cause.isVerified,
    } as CauseDto;
  }

  updateInstanceWithDto(dto: Auditable & CauseDto, cause: Cause): void {
    cause.id = dto.id || cause.id;
    cause.title = dto.title || cause.title;
    cause.description = dto.description || cause.description;
    cause.attachments = dto.attachments || cause.attachments;
    cause.donations = dto.donations
      ? dto.donations.map((d) => new Donation(d))
      : cause.donations;
    cause.currentCollection = dto.currentCollection || cause.currentCollection
    cause.target = dto.target || cause.target;
    cause.currency = dto.currency || cause.currency;
    cause.expiryDate = dto.expiry || cause.expiryDate;
    cause.bankAccount = dto.bankAccount || cause.bankAccount;
    cause.owner = dto.owner || cause.owner;
    cause.createdOn = dto.createdOn || cause.createdOn;
    cause.createdBy = dto.createdBy || cause.createdBy;
    cause.updatedOn = dto.updatedOn || cause.updatedOn;
    cause.updatedBy = dto.updatedBy || cause.updatedBy;
    cause.isDeleted = dto.isDeleted || cause.isDeleted;
    cause.deletedOn = dto.deletedOn || cause.deletedOn;
    cause.deletedBy = dto.deletedBy || cause.deletedBy;
    cause.permissions = dto.permissions || cause.permissions;
    cause.sharedWith = dto.sharedWith || cause.sharedWith;
    cause.status = dto.verificationStatus || cause.status;
    cause.isVerified = dto.isVerified || cause.isVerified
  }
}
