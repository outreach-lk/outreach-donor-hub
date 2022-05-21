/**
 * listens to Donation_Claim change events and update relevant causes.
 */

import Cause from "../../data/entities/cause.entity";
import AppEvent from "../../data/entities/event.entity";
import CauseRepo from "../../data/repos/cause.repo";
import { CauseDto } from "../../types/dtos/cause.dtos";
import { DonationDto } from "../../types/dtos/donation.dtos";
import { EventDto } from "../../types/dtos/event.dtos";
import { EventType } from "../../types/enums/events";
import { DonationStatus } from "../../types/enums/status";
import { simpleLogger } from "../middleware/server-logger";

export async function onDonationClaimUpdate(e: EventDto){
  const data = e.payload as {before: DonationDto, after: DonationDto};
  const cause = await CauseRepo.getRepo().get(e.topic)
  .then((res) => {
    return new Cause(res.data as CauseDto);
  });

  const _bfrCol = {...cause.currentCollection};

  const wasClaimedBefore = data.before.status === DonationStatus.CLAIMED;
  const wasAcknowledgedBefore = data.before.status === DonationStatus.ACKNOWLEDGED;
  const wasRejectedBefore  = data.before.status === DonationStatus.REJECTED;
  const wasDisputedBefore  = data.before.status === DonationStatus.DISPUTED;


  switch(e.eventType){
    case EventType.DONATION_CLAIM_REQUEUED:
      // if claim was originally acknowledged, deduct the 
      // amount from cause.currentCollection.acknowledged
      // finally add the amount to pending if it was not Disputed 
      // before, in which case the amount was Never deducted from 
      // pending
      if(wasAcknowledgedBefore){
        cause.currentCollection.acknowledged -= data.after.amount;
      }
      if(!wasDisputedBefore){
        cause.currentCollection.pending += data.after.amount;
      }
      break;
    case EventType.DONATION_CLAIM_DECLINED:
      // if claim was originally claimed, do nothing (claim will remain pending)
      // if claim was originally acknowledged, deduct the 
      // amount from cause.currentCollection.acknowledged
      // if claim was originally rejected add the amount 
      // to pending
      if(wasAcknowledgedBefore){
        cause.currentCollection.acknowledged -= data.after.amount;
      }
      if(wasRejectedBefore){
        cause.currentCollection.pending += data.after.amount;
      }
      break;
    case EventType.DONATION_CLAIM_REJECTED:
      // if claim was originally disputed or claimed, 
      // deduct the amount from pending
      // if claim was originally acknowledged,
      // deduct the amount from acknowledged
      if(wasDisputedBefore || wasClaimedBefore){
        cause.currentCollection.pending -= data.after.amount;
      }
      if(wasAcknowledgedBefore){
        cause.currentCollection.acknowledged -= data.after.amount;
      }
      break;
    case EventType.DONATION_CLAIM_ACKNOWLEDGED:
      // if claim was originally discputed or claimed,
      // deduct the amount from pending.
      // finally add the amount to acknowledged
      if(wasDisputedBefore || wasClaimedBefore){
        cause.currentCollection.pending -= data.after.amount;
      }
      cause.currentCollection.acknowledged += data.after.amount;
      break;
  }
  cause.update()
  .then(res => {
    simpleLogger('updated cause.currentCollection on donation status change',{
      amount: data.after.amount,
      action: e.eventType,
      before: _bfrCol,
      after: cause.currentCollection
    })
  })
}