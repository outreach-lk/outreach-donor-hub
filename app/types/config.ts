/**
 * Type for Application Configuration
 */

import { UserRole } from "./dtos/user.dtos"
import { Permissions } from "./enums/permissions"

export type AppConfig = {
    title: string,
    laguages: string[],
    version: string,
    routes: AppRoutes[]
}

export type AppRoutes = {
    id: string,
    path: string,
    isProtected: boolean,
    /**@default null no role check */
    allowedRoles?: UserRole[]
    /** 
     * View Page of an Entity.
     * Used to grant elevated access to the entity
     * */
    isEntity: boolean,
    /**
     * Required Permissions on an entity to view this path
     */
    entityPerms?: Permissions[]
}