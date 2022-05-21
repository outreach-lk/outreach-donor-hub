/**
 * Cross Environment Data Repositories for Expenses.
 * Methods may either be common two both server and browser environments or
 * they may be exclusive to each - in which case one of two prefixes precede.
 * browser: $browser or node $server
 * Note: Actual data access may happen in methods implemented elsewhere.
 **/

import { Auditable } from "../../types/auditable";
import { ExpenseDto } from "../../types/dtos/expense.dtos";
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
  ExpenseStatusToEventMapping,
  ExpenseStatusToEventMessageMapping,
} from "../../utils/expense-status-to-event-mapping";
import { ExpenseStatus } from "../../types/enums/status";
import { authServiceFactory } from "../../api/services";
import { UserRole } from "../../types/dtos/user.dtos";
import { simpleLogger } from "../../api/middleware/server-logger";

export default class ExpenseRepo
  extends BaseRepo
  implements ICRUDREPO<ExpenseDto>
{
  private static _instance: ExpenseRepo | null;
  private entity = "expense";
  private token?: string;
  constructor() {
    super(DatabaseProvider.FIREBASE);
    this.token = authClientFactory.getClient(AuthProvider.FIREBASE).accessToken;
  }
  async get(
    identifier: string
  ): Promise<EntityFetchedDto<Auditable & Ownable & ExpenseDto>> {
    if (this.isBrowser) {
      const path = apiMap.v1["[entity]"]["[id]"].root
        .replace("[entity]", this.entity)
        .replace("[id]", identifier);
      return (await axios.get(path)).data as EntityFetchedDto<
        Auditable & Ownable & ExpenseDto
      >;
    } else {
      return (this.db as IDatabaseService).find(identifier, this.entity);
    }
  }
  getAll(): Promise<EntityFetchedPageDto<Auditable & ExpenseDto[]>> {
    throw new Error("Method not implemented.");
  }
  async getPage(
    page: Page,
    queryMap?: Map<string, string | number>
  ): Promise<EntityFetchedPageDto<Auditable & Ownable & ExpenseDto>> {
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
    data: ExpenseDto
  ): Promise<EntityCreatedDto<Auditable & Ownable & ExpenseDto>> {
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
      if (data.causeId && data.amount && data.note) {
        try {
          const _cause = await CauseRepo.getRepo().get(data.causeId);
          const cause = new Cause(_cause.data as CauseDto);
          data.sharedWith = [];
          data.sharedWith.push(
            cause.owner as string,
            ...(cause.sharedWith as string[])
          );
          return (this.db as IDatabaseService)
            .save(data, this.entity)
            .then((res) => {
              cause.expenses = {
                ...cause.expenses,
                pending: cause.expenses.pending + data.amount,
              };
              Promise.all([
                cause.update(),
                AppEvent.create({
                  eventType: EventType.EXPENSE_CLAIM_CREATED,
                  topic: data.causeId,
                  message: `A Expense claim of ${data.amount} LKR was made.`,
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
    data: ExpenseDto
  ): Promise<EntityUpdatedDto<Auditable & Ownable & ExpenseDto>> {
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
      const {data: expense} = await this.get(identifier);
      // const {data: cause} = await CauseRepo.getRepo().get(data.causeId);
      const user = authServiceFactory.getService(
        AuthProvider.FIREBASE
      ).authenticatedUser;
      let allowUpdate: boolean = true;

      // changes
      const statusChanged  = data.status !== expense?.status;

      // All other gatekeeping (allowUpdate changes) should have lesser
      // priority, ie. be handled before the following.
      if (statusChanged) {
        //Prevent updating if the claim has already been reviewed.
        allowUpdate =
          expense?.status === ExpenseStatus.CLAIMED ||
          expense?.status === undefined ||
          // also allo moderators to bypass the above rules.
          (user?.role === UserRole.ADMIN || user?.role === UserRole.MODERATOR)

        if(expense?.owner === user?.uid){
          // FIXME: should trigger verbose error messages
          simpleLogger("expense owner cannot update expense status")
          allowUpdate = false;
        }
      }
      if (allowUpdate) {
        if (data.status) {
          AppEvent.create({
            eventType: ExpenseStatusToEventMapping(data.status),
            message: ExpenseStatusToEventMessageMapping(data),
            topic: data.causeId,
            payload: {
              before: expense,
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
  ): Promise<EntityDeletedDto<Auditable & Ownable & ExpenseDto>> {
    throw new Error("Method not implemented.");
  }

  /** Returns the repo instance. */
  static getRepo(): ExpenseRepo {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new ExpenseRepo());
    }
  }
}
