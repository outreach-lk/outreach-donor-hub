import BaseEntity from "../data/entities/base.entity";
import Cause from "../data/entities/cause.entity";
import { EntitySignature } from "./api-route-info";
import { CauseDto } from "../types/dtos/cause.dtos";
import Donation from "../data/entities/donation.entity";
import { DonationDto } from "../types/dtos/donation.dtos";
import Expense from "../data/entities/expense.entity";
import { ExpenseDto } from "../types/dtos/expense.dtos";

/**
 * Fetches an entity based on an entity signature object.
 * @param signature
 * @returns
 */
export async function fetchEntityFromSignature(
  signature: EntitySignature
): Promise<BaseEntity<any, any>> {
  let dto: any;
  switch (signature.entityType) {
    default:
      throw new Error("invalid_entity_type");
    case "cause":
      dto = (await Cause.get(signature.entityId)).data;
      if (dto) {
        return new Cause(dto as CauseDto);
      } else {
        throw new Error("error_fetching_cause");
      }
    case "donation":
      dto = (await Donation.get(signature.entityId)).data;
      if (dto) {
        return new Donation(dto as DonationDto);
      } else {
        throw new Error("error_fetching_donation");
      }
      case "expense":
        dto = (await Expense.get(signature.entityId)).data;
        if (dto) {
          return new Expense(dto as ExpenseDto);
        } else {
          throw new Error("error_fetching_expense");
        }
  }
}
