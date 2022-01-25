/**
* Defines dtos relevant to Causes
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { UserDto } from "./user.dtos";
import { FileDto } from "./remote.file.dtos";

export type CauseDto = {
    causeId: string,
    causeOwner: UserDto,
    title: string,
    description: string,
    attachments: FileDto[]
}

export type CausePage = Pagable<CauseDto>

/** Auditable Dtos */
export type AuditableCauseDto = CauseDto & Auditable;