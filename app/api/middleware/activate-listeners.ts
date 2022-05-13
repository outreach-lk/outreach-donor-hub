import { NextApiRequest, NextApiResponse } from "next";
import EventRepo from "../../data/repos/event.repo";
import { useLogger } from "../../hooks/logger.hooks";
import { EventType } from "../../types/enums/events";
import { CallNextHandler } from "../../types/middleware";
import {
  onDonationClaimAcknowledged,
  onDonationClaimDeclined,
} from "../event-listeners/update-cause-on-donation.listener";

export function attachAppEventListeners(
  req: NextApiRequest,
  res: NextApiResponse,
  next: CallNextHandler
) {
  const emitter = EventRepo.getRepo().emitter;
  /**Donation events */
  emitter.on(
    EventType.DONATION_CLAIM_ACKNOWLEDGED,
    onDonationClaimAcknowledged
  );
  emitter.on(EventType.DONATION_CLAIM_DECLINED, onDonationClaimDeclined);
  res.on("close", emitter.removeAllListeners);
  next();
}
