/**
* Defines dtos relevant to Donation
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { FileDto } from "./remote.file.dtos";
import { Ownable } from "../ownable";
import { ServerError } from "./server.message.dtos";
import { EntityCreatedDto } from "./server.message.dtos";
import { EntityUpdatedDto } from "./server.message.dtos";
import Cause from "../../data/entities/cause.entity";
import ClaimEvidence from "../../data/entities/claim-evidence";
import { DonationStatus } from "../enums/status";

export type DonationDto = Ownable & {
    cause: Cause
    amount: number
    note: string
    evidence: ClaimEvidence[]
    status: DonationStatus
}

export type DonationPage = Pagable<DonationDto>

export type DonationCreatedDto = EntityCreatedDto<AuditableDonationDto | ServerError>;
export type DonationUpdatedDto = EntityUpdatedDto<AuditableDonationDto | ServerError>;


/** Auditable Dtos */
export type AuditableDonationDto = DonationDto & Auditable;