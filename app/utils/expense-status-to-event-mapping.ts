import { ExpenseDto } from "../types/dtos/expense.dtos";
import { EventType } from "../types/enums/events";
import { ExpenseStatus } from "../types/enums/status";

export function ExpenseStatusToEventMapping(status: ExpenseStatus): EventType {
  console.log(status);
  switch (status) {
    case ExpenseStatus.CLAIMED:
      return EventType.EXPENSE_CLAIM_REQUEUED;
    case ExpenseStatus.ACKNOWLEDGED:
      return EventType.EXPENSE_CLAIM_APPROVED;
    case ExpenseStatus.DISPUTED:
      return EventType.EXPENSE_CLAIM_DECLINED;
    case ExpenseStatus.REJECTED:
      return EventType.EXPENSE_CLAIM_REJECTED;
    default:
      throw new Error("invalid status");
  }
}

export function ExpenseStatusToEventMessageMapping(
  expense: ExpenseDto
): string {
  switch (expense.status) {
    case ExpenseStatus.CLAIMED:
      return `Expense Claim of ${expense.amount.toFixed(2)} was added to queue by mods`;
    case ExpenseStatus.ACKNOWLEDGED:
      return `Expense Claim of ${expense.amount.toFixed(2)} was acknowledged by mods`;
    case ExpenseStatus.DISPUTED:
      return `Expense Claim of ${expense.amount.toFixed(2)} was declined by mods`;
    case ExpenseStatus.REJECTED:
      return `Expense Claim of ${expense.amount.toFixed(2)} was rejected by Mods.`;
    default:
      throw new Error("invalid status");
  }
}
