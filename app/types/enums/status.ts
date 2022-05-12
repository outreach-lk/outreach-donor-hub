export enum DonationStatus {
    SENT,
    ACKNOWLEDGED_AND_VERIFIED,
    UNACKNOWLEGED_AND_VERIFIED,
    DISPUTED,
    INVALID
}

export enum ClaimStatus {
    PENDING_APPROVAL,
    APPROVED,
    REJECTED
}

export enum VerificationStatus {
    QUEUED,
    LOCKED_BY_MOD,
    INPROGRESS,
    VERIFIED,
    REJECTED,
    UNKNOWN
}
