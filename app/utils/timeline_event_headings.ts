import { EventType } from "../types/enums/events";

export function eventHeadings(event: EventType):string{
    switch(event){
        default:
            return 'Unknown Event';
        case EventType.CAUSE_CREATED:
            return 'Campaign Created';
        case EventType.CAUSE_DECLINED:
            return 'Campaign Declined by Mods';
        case EventType.CAUSE_MILESTONE:
            return 'Reached Campaign Milestone';
        case EventType.CAUSE_QUEUED:
            return 'Campaign Queued for Mod Verification';
        case EventType.CAUSE_VERIFIED:
            return 'Campaign Verified by Mods';
        case EventType.DONATION_CLAIM_ACKNOWLEDGED:
            return 'Donation Acknowledged';
        case EventType.DONATION_CLAIM_CREATED:
            return 'Donation Claim Received';
        case EventType.DONATION_CLAIM_DECLINED:
            return 'Donation Claim Declined';
        case EventType.EXPENSE_CLAIM_APPROVED:
            return 'Expense Claim Approved by Mods';
        case EventType.EXPENSE_CLAIM_CREATED:
            return 'New Expense Claim';
        case EventType.EXPENSE_CLAIM_DECLINED:
            return 'Expense Claim Declined'
    }
}