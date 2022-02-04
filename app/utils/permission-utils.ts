import { UserRole } from "../types/dtos/user.dtos";

/**
 * Obtain the default permissions for the roles
 * @param role 
 * @returns 
 */
export function getDefaultRolePermissions(role:UserRole):Permissions[]{
    switch(role){
        case UserRole.ADMIN:
            return [

            ] as Permissions[];
        case UserRole.MODERATOR:
            return [

            ] as Permissions[];
        case UserRole.REGULAR:
            return [

            ] as Permissions[];
        case UserRole.GUEST:
            return [

            ] as Permissions[];
    }
}