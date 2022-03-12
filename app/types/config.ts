/**
 * Type for Application Configuration
 */

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
    isEntity: boolean,
    requiredPerms?: Permissions[]
}