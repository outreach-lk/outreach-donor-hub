/**
* Defines dtos relevant to Donation
*/

import type { Auditable } from "../auditable";
import type { Pagable } from "../pagable";
import type { Ownable } from "../ownable";
import type { ServerError } from "./server-message.dtos";
import type { EntityCreatedDto } from "./server-message.dtos";
import type { EntityUpdatedDto } from "./server-message.dtos";
import type { DonationStatus } from "../enums/status";
import type { CauseDto } from "./cause.dtos";
import type { ClaimEvidenceDto } from "./claim-evidence";

export type DonationDto = Ownable & {
    ref: string,
    causeId: string,
    amount: number
    note?: string
    evidence?: ClaimEvidenceDto[]
    status?: DonationStatus
}

export type DonationPage = Pagable<DonationDto>

export type DonationCreatedDto = EntityCreatedDto<AuditableDonationDto | ServerError>;
export type DonationUpdatedDto = EntityUpdatedDto<AuditableDonationDto | ServerError>;


/** Auditable Dtos */
export type AuditableDonationDto = DonationDto & Auditable;