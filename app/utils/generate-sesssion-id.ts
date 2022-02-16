import {v4 as uuidv4} from "uuid"

/**
 * Create a unique id for the user session.
 * @returns session id.
 * @version 1.0.0b
 */
export function generateSessionId():string{
    return uuidv4();
}