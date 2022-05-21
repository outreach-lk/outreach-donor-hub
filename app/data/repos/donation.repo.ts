/**
 * Cross Environment Data Repositories for Donations.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
 **/

import { Auditable } from "../../types/auditable";
import { DonationDto } from "../../types/dtos/donation.dtos";
import { FileDto } from "../../types/dtos/remote-file.dtos";
import {
  EntityFetchedDto,
  EntityFetchedPageDto,
  EntityCreatedDto,
  EntityUpdatedDto,
  EntityDeletedDto,
} from "../../types/dtos/server-message.dtos";
import { EventType } from "../../types/enums/events";
import { AuthProvider, DatabaseProvider } from "../../types/enums/providers";
import ICRUDREPO from "../../types/interfaces/crud.repo.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import { Ownable } from "../../types/ownable";
import { Page } from "../../types/pagable";
import AppEvent from "../entities/event.entity";
import BaseRepo from "./base.repo";
import apiMap from "../../api/api-map.json";
import axios from "axios";
import { authClientFactory } from "../../api/clients";
import CauseRepo from "./cause.repo";
import Cause from "../entities/cause.entity";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { queryMap2string } from "../../utils/parse-querystring";
import {
  donationStatusToEventMapping,
  donationStatusToEventMessageMapping,
} from "../../utils/donation-status-to-event-mapping";
import { DonationStatus } from "../../types/enums/status";
import { authServiceFactory } from "../../api/services";
import { UserRole } from "../../types/dtos/user.dtos";
import { requestLogger, simpleLogger } from "../../api/middleware/server-logger";

export default class DonationRepo
  extends BaseRepo
  implements ICRUDREPO<DonationDto>
{
  private static _instance: DonationRepo | null;
  private entity = "donation";
  private token?: string;
  constructor() {
    super(DatabaseProvider.FIREBASE);
    this.token = authClientFactory.getClient(AuthProvider.FIREBASE).accessToken;
  }
  async get(
    identifier: string
  ): Promise<EntityFetchedDto<Auditable & Ownable & DonationDto>> {
    if (this.isBrowser) {
      const path = apiMap.v1["[entity]"]["[id]"].root
        .replace("[entity]", this.entity)
        .replace("[id]", identifier);
      return (await axios.get(path)).data as EntityFetchedDto<
        Auditable & Ownable & DonationDto
      >;
    } else {
      return (this.db as IDatabaseService).find(identifier, this.entity);
    }
  }
  getAll(): Promise<EntityFetchedPageDto<Auditable & DonationDto[]>> {
    throw new Error("Method not implemented.");
  }
  async getPage(
    page: Page,
    queryMap?: Map<string, string | number>
  ): Promise<EntityFetchedPageDto<Auditable & Ownable & DonationDto>> {
    if (this.isBrowser) {
      let path = apiMap.v1["[entity]"].root
        .replace("[entity]", this.entity)
        .concat("?", "limit=", page.limit.toString());
      if (page.start) {
        path = path.concat("&from=", String(page.start));
      }
      if (queryMap) {
        path = path.concat("&query=", queryMap2string(queryMap));
      }
      try {
        return (await axios.get(path, {})).data.data;
      } catch (error) {
        throw error;
      }
    } else {
      return (this.db as IDatabaseService).findPage(
        page,
        this.entity,
        queryMap
      );
    }
  }
  async create(
    data: DonationDto
  ): Promise<EntityCreatedDto<Auditable & Ownable & DonationDto>> {
    if (this.isBrowser) {
      let path = apiMap.v1["[entity]"].root.replace("[entity]", this.entity);
      const token = authClientFactory.getClient(
        AuthProvider.FIREBASE
      ).accessToken;
      return (
        await axios.post(path, data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      ).data.data;
    } else {
      if (data.causeId && data.ref && data.amount) {
        try {
          const _cause = await CauseRepo.getRepo().get(data.causeId);
          const cause = new Cause(_cause.data as CauseDto);
          data.status = DonationStatus.CLAIMED;
          data.sharedWith = [];
          data.sharedWith.push(
            cause.owner as string,
            ...(cause.sharedWith as string[])
          );
          return (this.db as IDatabaseService)
            .save(data, this.entity)
            .then((res) => {
              cause.currentCollection = {
                ...cause.currentCollection,
                pending: cause.currentCollection.pending + data.amount,
              };
              Promise.all([
                cause.update(),
                AppEvent.create({
                  eventType: EventType.DONATION_CLAIM_CREATED,
                  topic: data.causeId,
                  message: `A Donation claim of ${data.amount} LKR was made.`,
                }),
              ]).finally(() => {});
              return res;
            });
        } catch {
          throw new Error("invalid cause id");
        }
      } else {
        throw new Error("invalid payload");
      }
    }
  }
  async update(
    identifier: string,
    data: DonationDto
  ): Promise<EntityUpdatedDto<Auditable & Ownable & DonationDto>> {
    if (this.isBrowser) {
      let path = apiMap.v1["[entity]"]["[id]"].root
        .replace("[entity]", this.entity)
        .replace("[id]", identifier);
      return (
        await axios.put(path, data, {
          headers: {
            authorization: `Bearer ${this.token}`,
          },
        })
      ).data;
    } else {
      let allowUpdate = false;
      const { data: donation } = await this.get(identifier);
      const { data: cause } = await CauseRepo.getRepo().get(data.causeId);
      const user = authServiceFactory.getService(
        AuthProvider.FIREBASE
      ).authenticatedUser;

      //changes
      const statusChanged = data.status !== donation?.status;
      //Prevent updating if the claim has already been reviewed.
      if (statusChanged) {
        allowUpdate =
          donation?.status === DonationStatus.CLAIMED ||
          donation?.status === undefined ||
          // also allo moderators to bypass the above rules.
          (user?.role === UserRole.ADMIN || user?.role === UserRole.MODERATOR)
        // only the cause owner or with whom the campaign has been shared can
        // update the status to Acknowledged.
        if (
          donation?.status === DonationStatus.ACKNOWLEDGED
        ) {
          allowUpdate = !!(cause?.owner === user?.uid )|| !!(cause?.sharedWith?.includes(user?.uid as string))
          if(!allowUpdate){
            // FIXME: should return verbose error messages in the response
            simpleLogger(
              "only campaign maintainers can set donation to acknowledged"
            );
          }
        }

        // do not let the donation owner make any changes to the state
        if (donation?.owner === user?.uid) {
          simpleLogger("donation owner cannot update")
          allowUpdate = false;
        }
      }
      if (allowUpdate) {
        if (data.status) {
          AppEvent.create({
            eventType: donationStatusToEventMapping(data.status),
            message: donationStatusToEventMessageMapping(data),
            topic: data.causeId,
            payload: {
              before: donation,
              after: data
            },
          });
        }
        return (this.db as IDatabaseService).update(
          identifier,
          data,
          this.entity
        );
      } else {
        throw new Error("illeagal update");
      }
    }
  }
  delete(
    identifier: string
  ): Promise<EntityDeletedDto<Auditable & Ownable & DonationDto>> {
    throw new Error("Method not implemented.");
  }

  /** Returns the repo instance. */
  static getRepo(): DonationRepo {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new DonationRepo());
    }
  }
}
