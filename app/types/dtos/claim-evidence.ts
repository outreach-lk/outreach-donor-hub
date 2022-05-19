/**
* Defines dtos relevant to ClaimEvidence
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { FileDto } from "./remote-file.dtos";
import { Ownable } from "../ownable";
import { ServerError } from "./server-message.dtos";
import { EntityCreatedDto } from "./server-message.dtos";
import { EntityUpdatedDto } from "./server-message.dtos";
import { ClaimStatus } from "../enums/status";

export type ClaimEvidenceDto = Ownable & {
    attachments: FileDto
    status?: ClaimStatus
}

export type ClaimEvidencePage = Pagable<ClaimEvidenceDto>

export type ClaimEvidenceCreatedDto = EntityCreatedDto<AuditableClaimEvidenceDto | ServerError>;
export type ClaimEvidenceUpdatedDto = EntityUpdatedDto<AuditableClaimEvidenceDto | ServerError>;


/** Auditable Dtos */
export type AuditableClaimEvidenceDto = ClaimEvidenceDto & Auditable;