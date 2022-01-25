/** Defines types for Ownable Data Items */

import { UserDto } from "./dtos/user.dtos";

export enum AccessPerms{
    READ,WRITE,MODIFY,DELETE
}

export type Ownable = {
    id: string,
    owner: UserDto,
    sharedWith?: UserDto[],
    permissions?: OwnablePermissions
}

export type OwnablePermissions = {
    owner: AccessPerms[],
    admins: AccessPerms[],
    mods: AccessPerms[],
    shared: AccessPerms[],
}