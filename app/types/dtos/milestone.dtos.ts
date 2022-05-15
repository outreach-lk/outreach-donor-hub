/**
* Defines dtos relevant to Milestone
*/

import type { Auditable } from "../auditable";
import type { Pagable } from "../pagable";
import type { Ownable } from "../ownable";
import type { ServerError } from "./server-message.dtos";
import type { EntityCreatedDto } from "./server-message.dtos";
import type { EntityUpdatedDto } from "./server-message.dtos";
import type { MilestoneStatus } from "../enums/status";
import { SerializableBlock } from "../../ui/components/modules/wyswyg-editor";

export type MilestoneDto = Ownable & {
    causeId: string,
    title: string,
    description: SerializableBlock[],
    status?: MilestoneStatus
}

export type MilestonePage = Pagable<MilestoneDto>

export type MilestoneCreatedDto = EntityCreatedDto<AuditableMilestoneDto | ServerError>;
export type MilestoneUpdatedDto = EntityUpdatedDto<AuditableMilestoneDto | ServerError>;


/** Auditable Dtos */
export type AuditableMilestoneDto = MilestoneDto & Auditable;