/**
* Defines dtos relevant to Causes
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { FileDto } from "./remote.file.dtos";
import { Ownable } from "../ownable";
import { ServerError, ServerMessageDto } from "./server.message.dtos";

export type CauseDto = Ownable & {
    title: string,
    description: string,
    attachments: FileDto[]
}

export type CausePage = Pagable<CauseDto>

export type CauseCreatedDto = ServerMessageDto<AuditableCauseDto | ServerError>;
export type CauseUpdatedDto = ServerMessageDto<AuditableCauseDto | ServerError>;


/** Auditable Dtos */
export type AuditableCauseDto = CauseDto & Auditable;