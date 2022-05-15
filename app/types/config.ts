/**
 * Type for Application Configuration
 */

import { UserRole } from "./dtos/user.dtos"
import { HTTPMethod } from "./enums/api"
import { Permissions } from "./enums/permissions"

export type AppConfig = {
    title: string,
    laguages: string[],
    version: string,
    routes: AppRoutes[],
    appUrl: string
}

export type AppRoutes = {
    id: string,
    path: string,
    isProtected: boolean,
    /**@default null no role check */
    allowedRoles?: UserRole[]
    /** 
     * A path to a single Entity.
     * Not true for Entity Collections
     * Used to grant elevated access to the entity
     * */
    isEntity: boolean,
    /**
     * Required Permissions on an entity to view this path
     */
    entityPerms?: Permissions[],
    isApi?: boolean,
    apiMethod?: HTTPMethod
}