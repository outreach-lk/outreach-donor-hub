/**
 * Defines the DTO types for User and User related dtos.
 */

import { Auditable } from "../auditable"
import { Pagable } from "../pagable";
import { FileDto } from "./remote.file.dtos";
import { ServerError, ServerMessageDto } from "./server.message.dtos";

/**
 * DTO for User Object
 */
export type UserDto = {
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
    mobile?: string,
    isMobileVerified?: boolean,
    isEmailVerified: boolean,
    isVerifiedUser: boolean,
    verification? : UserVerificationDto,
    role?: UserRole
}

/**
 * DTO for User Verification Data
 */
export type UserVerificationDto = {
    nic: {
        nicFront: FileDto,
        nicBack: FileDto,
    },
    isNicVerified: boolean,
    face: FileDto,
    isFaceVerified: boolean,
    isVoiceVerified?: boolean,
};

/**
 * Enum of User Roles a user can assume
 * TODO: Does this belong here?
 */
 export enum UserRole{
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    REGULAR = "REGULAR"
}



/** Response to Create New User */
export type UserCreateResDto = ServerMessageDto<AuditableUserDto | ServerError>;

/** Response to Update User */
export type UserUpdateResDto = ServerMessageDto<AuditableUserDto | ServerError>;

/** Response to Delete User */
export type UserDeleteResDto = ServerMessageDto< never | ServerError>;

/** Response to list all Users */
export type UserListAllResDto = ServerMessageDto<Pagable<AuditableUserDto> | ServerError>;

/** Auditable forms of all dtos exported here */
export type AuditableUserDto = UserDto & Auditable;
export type AuditableUserVerificationDto = UserVerificationDto & Auditable;