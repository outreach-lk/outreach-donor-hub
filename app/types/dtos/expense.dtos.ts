/**
* Defines dtos relevant to Expense
*/

import type { Auditable } from "../auditable";
import type { Pagable } from "../pagable";
import type { Ownable } from "../ownable";
import type { ServerError } from "./server-message.dtos";
import type { EntityCreatedDto } from "./server-message.dtos";
import type { EntityUpdatedDto } from "./server-message.dtos";
import type { ExpenseStatus } from "../enums/status";
import type { CauseDto } from "./cause.dtos";
import type { ClaimEvidenceDto } from "./claim-evidence";
import { FileDto } from "./remote-file.dtos";

export type ExpenseDto = Ownable & {
    causeId: string,
    amount: number
    note: string
    link?: string
    status?: ExpenseStatus
    evidence?: FileDto
}

export type ExpensePage = Pagable<ExpenseDto>

export type ExpenseCreatedDto = EntityCreatedDto<AuditableExpenseDto | ServerError>;
export type ExpenseUpdatedDto = EntityUpdatedDto<AuditableExpenseDto | ServerError>;


/** Auditable Dtos */
export type AuditableExpenseDto = ExpenseDto & Auditable;