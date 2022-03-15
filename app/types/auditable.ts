/**
 * Defines types for auditable data
 */

import { UserDto } from "./dtos/user.dtos";

export type Auditable = {
    createdOn?: Date,
    createdBy?: UserDto // User ID
    updatedOn?: Date,
    updatedBy?: UserDto
    isDeleted?: boolean,
    deletedOn?: Date,
    deletedBy?: UserDto
}



