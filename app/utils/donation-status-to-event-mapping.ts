import Donation from "../data/entities/donation.entity";
import { DonationDto } from "../types/dtos/donation.dtos";
import { EventType } from "../types/enums/events";
import { DonationStatus } from "../types/enums/status";

export function donationStatusToEventMapping(
  status: DonationStatus
): EventType {
  switch (status) {
    case DonationStatus.ACKNOWLEDGED:
      return EventType.DONATION_CLAIM_ACKNOWLEDGED;
    case DonationStatus.DISPUTED:
      return EventType.DONATION_CLAIM_DECLINED;
    default:
      throw new Error("invalid status");
  }
}

export function donationStatusToEventMessageMapping(donation:DonationDto):string{
  switch(donation.status){
    case DonationStatus.ACKNOWLEDGED:
      return `Donation Claim of ${donation.amount.toFixed(2)} was acknowledged`;
    case DonationStatus.DISPUTED:
      return `Donation Claim of ${donation.amount.toFixed(2)} was declined.`;
    default:
      throw new Error("invalid status");
  }
}
