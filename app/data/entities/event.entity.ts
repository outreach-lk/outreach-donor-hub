/**
 * Cross Environment Data Access Object for Events
 **/

import { Auditable } from "../../types/auditable";
import { AuditableEventDto, EventDto } from "../../types/dtos/event.dtos";

import { Page } from "../../types/pagable";
import EventRepo from "../repos/event.repo";
import BaseEntity from "./base.entity";
import { IEventActions } from "../../types/interfaces/event.entity.interface";
import { EventType } from "../../types/enums/events";
import { Ownable } from "../../types/ownable";
import {
  EntityCreatedDto,
  EntityFetchedDto,
  EntityFetchedPageDto,
} from "../../types/dtos/server-message.dtos";
import { generateEventId } from "../../utils/generate-ids";
import EventEmitter from "events";

export default class AppEvent
  extends BaseEntity<AppEvent, EventDto>
  implements IEventActions
{
  mapInstanceToDto(
    dto: Auditable &
      Ownable & {
        eventId: string;
        eventType: EventType;
        topic: string;
        message: string;
        expiry: Date;
      },
    entity: AppEvent
  ): void {
    throw new Error("Method not implemented.");
  }
  // Define properties;
  public static emitter: EventEmitter = new EventEmitter();
  eventId: string;
  eventType: EventType;
  topic: string;
  message: string;
  expiry?: Date;
  constructor(dto: AuditableEventDto) {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    super(EventRepo.getRepo(), AppEvent.map2Dto);
    this._id = dto.id;
    this.eventId = dto.eventId || generateEventId();
    this.eventType = dto.eventType;
    this.topic = dto.topic;
    this.message = dto.message;
    this.expiry = dto.expiry;
    this.owner = dto.owner;
    this.createdOn = dto.createdOn ? dto.createdOn : null;
    this.createdBy = dto.createdBy;
    this.updatedOn = dto.updatedOn;
    this.updatedBy = dto.updatedBy;
    this.permissions = dto.permissions;
    this.sharedWith = dto.sharedWith;
  }

  /** Static CRUD Methods for GET and POST */
  /**
   * Creates a Event in the database with given data.
   * @param EventDto
   * @returns
   */
  static async create(EventDto: EventDto): Promise<EntityCreatedDto<EventDto>> {
    try {
      return EventRepo.getRepo()
        .create(EventDto)
        .then((res) => {
          if (res.data) {
            AppEvent.emitter.emit(res.data?.eventType, res.data);
          }
          return res;
        });
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  /**
   * Fetches Event with given identifier.
   * @param identifier
   * @returns
   */
  static async get(identifier: string): Promise<EntityFetchedDto<EventDto>> {
    try {
      return EventRepo.getRepo().get(identifier);
    } catch (error) {
      throw Error();
    }
  }

  /**
   * Fetches a page of Events
   * @param page
   * @returns
   */
  static async getPage(page: Page): Promise<EntityFetchedPageDto<EventDto>> {
    try {
      return EventRepo.getRepo().getPage(page);
    } catch (error) {
      throw Error();
    }
  }

  /** Mappers */
  /**
   * Maps Event to a Event DTO
   * @param Event
   * @returns
   */
  static map2Dto(Event: AppEvent): EventDto {
    return {} as EventDto;
  }

  /**
   * Maps a dto to an instance
   * @param dto
   * @param Event
   */
  static mapFromDto(dto: Auditable & EventDto, Event: AppEvent): void {}
}
