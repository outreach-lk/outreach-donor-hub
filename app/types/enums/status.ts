export enum DonationStatus {
  CLAIMED = "claimed",
  ACKNOWLEDGED = "acknowledged",
  DISPUTED = "disputed",
  REJECTED = "rejected",
}

export enum ClaimStatus {
  PENDING_APPROVAL,
  APPROVED,
  REJECTED,
}

export enum VerificationStatus {
  QUEUED,
  LOCKED_BY_MOD,
  INPROGRESS,
  VERIFIED,
  REJECTED,
  UNKNOWN,
}
