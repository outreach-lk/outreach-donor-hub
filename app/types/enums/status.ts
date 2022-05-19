export enum DonationStatus {
  CLAIMED = "claimed",
  ACKNOWLEDGED = "acknowledged",
  DISPUTED = "disputed",
  REJECTED = "rejected",
}

export enum ExpenseStatus {
  CLAIMED = "claimed",
  ACKNOWLEDGED = "acknowledged",
  DISPUTED = "disputed",
  REJECTED = "rejected",
}

export enum MilestoneStatus {
  CREATED = "created",
  CONFIRMED = "confirmed_by_mods",
}

export enum ClaimStatus {
  PENDING_APPROVAL,
  APPROVED,
  REJECTED,
}

export enum VerificationStatus {
  /**
   * @deprecated
   */
  QUEUED,
  /**
   * @deprecated
   */
  LOCKED_BY_MOD,
  INPROGRESS,
  VERIFIED,
  REJECTED,
  /** synonymous with pending */
  UNKNOWN,
}
