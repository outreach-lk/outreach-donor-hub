/**
 * listens to Expense_Claim change events and update relevant causes.
 */

 import Cause from "../../data/entities/cause.entity";
 import AppEvent from "../../data/entities/event.entity";
 import CauseRepo from "../../data/repos/cause.repo";
 import { CauseDto } from "../../types/dtos/cause.dtos";
 import { ExpenseDto } from "../../types/dtos/expense.dtos";
 import { EventDto } from "../../types/dtos/event.dtos";
 import { EventType } from "../../types/enums/events";
 import { ExpenseStatus } from "../../types/enums/status";
 import { simpleLogger } from "../middleware/server-logger";
 
 export async function onExpenseClaimUpdate(e: EventDto){
   const data = e.payload as {before: ExpenseDto, after: ExpenseDto};
   const cause = await CauseRepo.getRepo().get(e.topic)
   .then((res) => {
     return new Cause(res.data as CauseDto);
   });
 
   const _bfrCol = {...cause.expenses};
 
   const wasClaimedBefore = data.before.status === ExpenseStatus.CLAIMED;
   const wasAcknowledgedBefore = data.before.status === ExpenseStatus.ACKNOWLEDGED;
   const wasRejectedBefore  = data.before.status === ExpenseStatus.REJECTED;
   const wasDisputedBefore  = data.before.status === ExpenseStatus.DISPUTED;
 
 
   switch(e.eventType){
     case EventType.EXPENSE_CLAIM_REQUEUED:
       // if claim was originally acknowledged, deduct the 
       // amount from cause.expenses.acknowledged
       // finally add the amount to pending if it was not Disputed 
       // before, in which case the amount was Never deducted from 
       // pending
       if(wasAcknowledgedBefore){
         cause.expenses.confirmed -= data.after.amount;
       }
       if(!wasDisputedBefore){
         cause.expenses.pending += data.after.amount;
       }
       break;
     case EventType.EXPENSE_CLAIM_DECLINED:
       // if claim was originally claimed, do nothing (claim will remain pending)
       // if claim was originally acknowledged, deduct the 
       // amount from cause.expenses.acknowledged
       // if claim was originally rejected add the amount 
       // to pending
       if(wasAcknowledgedBefore){
         cause.expenses.confirmed -= data.after.amount;
       }
       if(wasRejectedBefore){
         cause.expenses.pending += data.after.amount;
       }
       break;
     case EventType.EXPENSE_CLAIM_REJECTED:
       // if claim was originally disputed or claimed, 
       // deduct the amount from pending
       // if claim was originally acknowledged,
       // deduct the amount from acknowledged
       if(wasDisputedBefore || wasClaimedBefore){
         cause.expenses.pending -= data.after.amount;
       }
       if(wasAcknowledgedBefore){
         cause.expenses.confirmed -= data.after.amount;
       }
       break;
     case EventType.EXPENSE_CLAIM_APPROVED:
       // if claim was originally discputed or claimed,
       // deduct the amount from pending.
       // finally add the amount to acknowledged
       if(wasDisputedBefore || wasClaimedBefore){
         cause.expenses.pending -= data.after.amount;
       }
       cause.expenses.confirmed += data.after.amount;
       break;
   }
   cause.update()
   .then(res => {
     simpleLogger('updated cause.expenses on Expense status change',{
       amount: data.after.amount,
       action: e.eventType,
       before: _bfrCol,
       after: cause.expenses
     })
   })
 }