import { NextApiRequest, NextApiResponse } from "next";
import EventRepo from "../../data/repos/event.repo";
import { useLogger } from "../../hooks/logger.hooks";
import { EventType } from "../../types/enums/events";
import { CallNextHandler } from "../../types/middleware";
import { onDonationClaimUpdate } from "../event-listeners/update-cause-on-donation.listener";
import { onExpenseClaimUpdate } from "../event-listeners/update-cause-on-expense.listener";

export function attachAppEventListeners(
  req: NextApiRequest,
  res: NextApiResponse,
  next: CallNextHandler
) {
  const emitter = EventRepo.getRepo().emitter;
  /**Donation events */
  emitter.on(EventType.DONATION_CLAIM_ACKNOWLEDGED, onDonationClaimUpdate);
  emitter.on(EventType.DONATION_CLAIM_DECLINED, onDonationClaimUpdate);
  emitter.on(EventType.DONATION_CLAIM_REJECTED, onDonationClaimUpdate);
  emitter.on(EventType.DONATION_CLAIM_REQUEUED, onDonationClaimUpdate);
  /**Expense events */
  emitter.on(EventType.EXPENSE_CLAIM_APPROVED, onExpenseClaimUpdate);
  emitter.on(EventType.EXPENSE_CLAIM_DECLINED, onExpenseClaimUpdate);
  emitter.on(EventType.EXPENSE_CLAIM_REJECTED, onExpenseClaimUpdate);
  emitter.on(EventType.EXPENSE_CLAIM_REQUEUED, onExpenseClaimUpdate);
  res.on("close", emitter.removeAllListeners);
  next();
}
