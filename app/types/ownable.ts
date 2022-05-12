/** Defines types for Ownable Data Items */

export enum AccessPerms{
    READ,WRITE,MODIFY,DELETE
}

export type Ownable = {
    id?: string,
    owner?: string,
    sharedWith?: string[],
    permissions?: OwnablePermissions
}

export type OwnablePermissions = {
    owner: AccessPerms[],
    admins: AccessPerms[],
    mods: AccessPerms[],
    shared: AccessPerms[],
}