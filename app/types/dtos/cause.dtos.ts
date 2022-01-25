/**
* Defines dtos relevant to Causes
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { FileDto } from "./remote.file.dtos";
import { Ownable } from "../ownable";

export type CauseDto = Ownable & {
    title: string,
    description: string,
    attachments: FileDto[]
}

export type CausePage = Pagable<CauseDto>

/** Auditable Dtos */
export type AuditableCauseDto = CauseDto & Auditable;