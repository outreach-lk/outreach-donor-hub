/**
* Defines dtos relevant to Causes
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { FileDto } from "./remote-file.dtos";
import { Ownable } from "../ownable";
import { ServerError } from "./server-message.dtos";
import { EntityCreatedDto } from "./server-message.dtos";
import { EntityUpdatedDto } from "./server-message.dtos";
import Donation from "../../data/entities/donation.entity";
import { DonationDto } from "./donation.dtos";

export type CauseDto = Ownable & {
    title: string,
    description: string,
    attachments: FileDto[],
    donations: DonationDto[]
}

export type CausePage = Pagable<CauseDto>

export type CauseCreatedDto = EntityCreatedDto<AuditableCauseDto | ServerError>;
export type CauseUpdatedDto = EntityUpdatedDto<AuditableCauseDto | ServerError>;


/** Auditable Dtos */
export type AuditableCauseDto = CauseDto & Auditable;