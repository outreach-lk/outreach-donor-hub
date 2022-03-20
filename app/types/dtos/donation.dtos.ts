/**
* Defines dtos relevant to Donation
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { FileDto } from "./remote-file.dtos";
import { Ownable } from "../ownable";
import { ServerError } from "./server-message.dtos";
import { EntityCreatedDto } from "./server-message.dtos";
import { EntityUpdatedDto } from "./server-message.dtos";
import { DonationStatus } from "../enums/status";
import { CauseDto } from "./cause.dtos";
import { ClaimEvidenceDto } from "./claim-evidence";

export type DonationDto = Ownable & {
    cause: CauseDto
    amount: number
    note: string
    evidence: ClaimEvidenceDto[]
    status: DonationStatus
}

export type DonationPage = Pagable<DonationDto>

export type DonationCreatedDto = EntityCreatedDto<AuditableDonationDto | ServerError>;
export type DonationUpdatedDto = EntityUpdatedDto<AuditableDonationDto | ServerError>;


/** Auditable Dtos */
export type AuditableDonationDto = DonationDto & Auditable;