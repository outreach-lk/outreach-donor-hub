/**
 * listens to Donation_Claim change events and update relevant causes.
 */

 import Cause from "../../data/entities/cause.entity";
 import AppEvent from "../../data/entities/event.entity";
 import CauseRepo from "../../data/repos/cause.repo";
 import { CauseDto } from "../../types/dtos/cause.dtos";
 import { DonationDto } from "../../types/dtos/donation.dtos";
 import { EventDto } from "../../types/dtos/event.dtos";
import { ExpenseDto } from "../../types/dtos/expense.dtos";
 
 export async function onExpenseClaimAcknowledged(e: EventDto) {
     console.log('onExpenseClaimAcknowledged')
   const cause = await CauseRepo.getRepo()
     .get(e.topic)
     .then((res) => {
       return new Cause(res.data as CauseDto);
     });
   cause.expenses.confirmed += (e.payload as ExpenseDto).amount;
   cause.expenses.pending -= (e.payload as ExpenseDto).amount;
   cause.update();
 }
 
 export async function onExpenseClaimDeclined(e: EventDto) {
    console.log('onExpenseClaimDeclined')

   const cause = await CauseRepo.getRepo()
     .get(e.topic)
     .then((res) => {
       return new Cause(res.data as CauseDto);
     });
   cause.expenses.confirmed -= (e.payload as ExpenseDto).amount;
   cause.expenses.pending += (e.payload as ExpenseDto).amount;
   cause.update();
 }
 