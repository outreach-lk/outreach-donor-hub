
import { EventType } from "../types/enums/events";
import { DonationStatus } from "../types/enums/status";

export function donationStatusToEventMapping(status:DonationStatus):EventType{
    switch(status){
        case DonationStatus.ACKNOWLEDGED:
            return EventType.DONATION_CLAIM_ACKNOWLEDGED;
        case DonationStatus.DISPUTED:
            return EventType.DONATION_CLAIM_DECLINED;
        default:
            throw new Error('invalid status');
    }
}