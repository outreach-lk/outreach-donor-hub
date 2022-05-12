/**
* Defines dtos relevant to Event
*/

import { Auditable } from "../auditable";
import { Pagable } from "../pagable";
import { Ownable } from "../ownable";
import { EntityCreatedDto, EntityUpdatedDto, ServerError } from "./server-message.dtos";
import { EventType } from "../enums/events";


export type EventDto = Ownable & {
    eventId?: string
    eventType: EventType
    topic: string
    message: string
    expiry?: Date
}

export type EventPage = Pagable<EventDto>

export type EventCreatedDto = EntityCreatedDto<AuditableEventDto | ServerError>;
export type EventUpdatedDto = EntityUpdatedDto<AuditableEventDto | ServerError>;


/** Auditable Dtos */
export type AuditableEventDto = EventDto & Auditable;