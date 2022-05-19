import { v4 as uuidv4 } from "uuid";
import shortHash from "short-hash";

/**
 * Create a unique id for the user session.
 * @returns session id.
 * @version 1.0.0b
 */
export function generateSessionId(): string {
  return uuidv4();
}

export function generateFeedbackId(): string {
  return "feedback-" + uuidv4();
}

export function generateEntityId(entity: string): string {
  return entity + "-" + uuidv4();
}

export function generateEventId(): string {
  return "event-" + uuidv4();
}

export function generateUniqueDonorRefId(
  causeId: string,
  userId: string
): string {
  return "DH"+shortHash(`${causeId}++${userId}`);
}

export function generateUniqueFileId(fileName: string): string {
  return shortHash(fileName);
}
