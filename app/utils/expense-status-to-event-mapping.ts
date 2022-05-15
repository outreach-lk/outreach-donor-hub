
import { ExpenseDto } from "../types/dtos/expense.dtos";
import { EventType } from "../types/enums/events";
import { ExpenseStatus } from "../types/enums/status";

export function ExpenseStatusToEventMapping(
  status: ExpenseStatus
): EventType {
  console.log(status)
  switch (status) {
    case ExpenseStatus.ACKNOWLEDGED:
      return EventType.EXPENSE_CLAIM_APPROVED;
    case ExpenseStatus.DISPUTED:
      return EventType.EXPENSE_CLAIM_DECLINED;
    default:
      throw new Error("invalid status");
  }
}

export function ExpenseStatusToEventMessageMapping(expense:ExpenseDto):string{
  switch(expense.status){
    case ExpenseStatus.ACKNOWLEDGED:
      return `Expense Claim of ${expense.amount.toFixed(2)} was acknowledged`;
    case ExpenseStatus.DISPUTED:
      return `Expense Claim of ${expense.amount.toFixed(2)} was declined.`;
    default:
      throw new Error("invalid status");
  }
}
