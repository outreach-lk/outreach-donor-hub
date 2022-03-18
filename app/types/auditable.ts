/**
 * Defines types for auditable data
 */

// import { UserDto } from "./dtos/user.dtos";

export type Auditable = {
    createdOn?: Date,
    createdBy?: string // User ID
    updatedOn?: Date,
    updatedBy?: string
    isDeleted?: boolean,
    deletedOn?: Date,
    deletedBy?: string
}



