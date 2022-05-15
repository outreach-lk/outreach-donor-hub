/* eslint-disable @typescript-eslint/unbound-method */
/**
 * Cross Environment Data Access Object for expenses
 **/

import { Auditable } from "../../types/auditable";
import {
  AuditableExpenseDto,
  ExpenseDto
} from "../../types/dtos/expense.dtos";
import {
  EntityCreatedDto,
  EntityFetchedDto,
  EntityFetchedPageDto,
} from "../../types/dtos/server-message.dtos";
import { Page } from "../../types/pagable";
import expenseRepo from "../repos/expense.repo";
import BaseEntity from "./base.entity";
// import { IexpenseActions } from "../../types/interfaces/expense.entity.interface";
import Cause from "./cause.entity";
import { ExpenseStatus } from "../../types/enums/status";
import ClaimEvidence from "./claim-evidence";
import { Ownable } from "../../types/ownable";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { ClaimEvidenceDto } from "../../types/dtos/claim-evidence";
import CauseRepo from "../repos/cause.repo";

export default class Expense
  extends BaseEntity<Expense, ExpenseDto>
{
  // Define properties;
  causeId: string;
  amount: number;
  note: string;
  link?: string;
  status?: ExpenseStatus;
  constructor(expenseDto: AuditableExpenseDto) {
    super(expenseRepo.getRepo(), Expense.map2Dto);
    this._id = expenseDto.id;
    this.causeId = expenseDto.causeId;
    this.amount = expenseDto.amount;
    this.note = expenseDto.note;
    this.link = expenseDto.link;
    this.status = expenseDto.status || ExpenseStatus.CLAIMED;
    this.owner = expenseDto.owner;
    this.createdOn = expenseDto.createdOn ? expenseDto.createdOn : null;
    this.createdBy = expenseDto.createdBy;
    this.updatedOn = expenseDto.updatedOn;
    this.updatedBy = expenseDto.updatedBy;
    this.permissions = expenseDto.permissions;
    this.sharedWith = expenseDto.sharedWith;
  }

  public confirmexpenseClaim() {
    this.status = ExpenseStatus.ACKNOWLEDGED;
    return this.update();
  }

  public disputeexpenseClaim() {
    this.status = ExpenseStatus.DISPUTED;
    return this.update();
  }

  updateInstanceWithDto(
    dto: Auditable &
      Ownable & ExpenseDto,
    entity: Expense
  ): void {
    entity.id = dto.id || entity.id;
    entity.status = dto.status || entity.status;
  }

  /** Static CRUD Methods for GET and POST */
  /**
   * Creates a expense in the database with given data.
   * @param expenseDto
   * @returns
   */
  static async create(
    expenseDto: ExpenseDto
  ): Promise<EntityCreatedDto<ExpenseDto>> {
    try {
      return expenseRepo.getRepo().create(expenseDto);
    } catch (error) {
      throw Error();
    }
  }

  /**
   * Fetches expense with given identifier.
   * @param identifier
   * @returns
   */
  static async get(identifier: string): Promise<EntityFetchedDto<ExpenseDto>> {
    try {
      return expenseRepo.getRepo().get(identifier);
    } catch (error) {
      throw Error();
    }
  }

  /**
   * Fetches a page of expenses
   * @param page
   * @returns
   */
  static async getPage(page: Page): Promise<EntityFetchedPageDto<ExpenseDto>> {
    try {
      return expenseRepo.getRepo().getPage(page);
    } catch (error) {
      throw Error();
    }
  }

  /** Mappers */
  /**
   * Maps expense to a expense DTO
   * @param expense
   * @returns
   */
  static map2Dto(expense: Expense): ExpenseDto {
    return {
      id: expense.id,
      amount: expense.amount,
      causeId: expense.causeId,
      link: expense.link,
      note: expense.note,
      owner: expense.owner,
      permissions: expense.permissions,
      sharedWith: expense.sharedWith,
      status: expense.status,
    } as ExpenseDto;
  }
}
