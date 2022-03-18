import { UserRole } from '../types/dtos/user.dtos';
import { AccessPerms } from '../types/ownable';

/**
 * Returns the basic information about an api route from the path.
 * @param path 
 * @returns 
 */
export function getRouteInfo(url:URL, method: string): ApiRouteInfo{
    const path = url.pathname;
    // TODO: Search for Route Info using path & method
    return {
    } as ApiRouteInfo
}

/**
 * Check if a request is allowed given the available access permissions.
 * Access permissions are modes & methods of interactions with an entity.
 * @param perms 
 * @param method 
 */
export function isMethodAllowed( perms: AccessPerms[], method: string):boolean {
    /**
     * The type of access action as implied by the request method.
     */
        let accessType: AccessPerms;
        switch (method) {
            case 'GET':
                accessType = AccessPerms.READ;
                break;
            case 'POST':
                accessType = AccessPerms.WRITE;
                break;
            case 'DELETE':
                accessType = AccessPerms.DELETE;
                break;
            case 'PUT':
                accessType = AccessPerms.MODIFY;
                break;
            default:
                throw new Error('invalid_access_method');
        }
    return perms.includes( accessType );
}

/**
 * Type Def. for API Route Info
 * TODO: Move to types directory
 */
export type ApiRouteInfo  = {
    path: string,
    isProtected: boolean,
    isEntity: boolean,
    allowedRoles: UserRole[],
    entitySignature?: EntitySignature
}

export type EntitySignature = {
    entityType: string,
    entityId: string,
}

/**
 * TODO: Move to enum directory
 */
export enum HTTPMethod {
    CONNECT = 'CONNECT',
    DELETE = 'DELETE',
    GET = 'GET',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
    TRACE = 'TRACE',
}