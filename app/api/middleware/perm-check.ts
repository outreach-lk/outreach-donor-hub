import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "../../types/dtos/user.dtos";
import { getRouteInfo, isMethodAllowed } from "../../utils/api-route-info";
import { createServerError } from "../../utils/create-server-response";
import { fetchEntityFromSignature } from "../../data/entities/signature-entity-mapper";
import { tokenInterceptor } from "../../utils/token-interceptor";
import { CallNextHandler } from "../../types/middleware";

/**
 * Checks if access to 
 * @param req 
 * @param res 
 * @param handler 
 */
export async function permissionCheck(req: NextApiRequest, res: NextApiResponse, next: CallNextHandler) {
    let isAllowed = false;
    const user = await tokenInterceptor(req);
    const { isEntity, entitySignature, allowedRoles, isProtected } = getRouteInfo(new URL(req.url as string, req.headers.host), req.method as string);
    /**
     * Unless the route isProtected always set isAllowed to true.
     * If not, continue to the rest of the checks.
     */
    if (isProtected) {
        /**
         * isAllowed is set to true If the requesting user has a role 
         * that is in the allowed roles list
         */
        if (user && user.role) {
            isAllowed = isAllowed && (allowedRoles.indexOf(user.role) > -1)
        } else if (allowedRoles.length) {
            isAllowed = false
        }

        /**
         * If the route points to an entity, fetch the said entity's 
         * owner, permissions & sharedWith details.
         * TODO: Cache this Entity somewhere and prevent a second read 
         * in the actual handler.
         */
        if (isEntity && entitySignature) {
            const data = await fetchEntityFromSignature(entitySignature);
            let isOwner = false;
            let isSharedWith = false;
            let hasAccessPerm = false;
            const isAdmin = user?.role === UserRole.ADMIN;
            const isMod = user?.role === UserRole.MODERATOR;
            /**
             * If the current request is authenticated,
             * continue with the checks. If not,
             * do not allow, as this is a protected api.
             */
            if (user) {
                isOwner = (data.owner === user);
                if (data.sharedWith) {
                    // FIXME: indexOf may not work properly
                    isSharedWith = (data.sharedWith?.indexOf(user) > -1)
                }
                if (data.permissions) {
                    if (isOwner) {
                        hasAccessPerm = isMethodAllowed(data.permissions.owner, req.method as string);
                    } else if (isSharedWith) {
                        hasAccessPerm = isMethodAllowed(data.permissions.shared, req.method as string);
                    } else if (isAdmin) {
                        hasAccessPerm = isMethodAllowed(data.permissions.admins, req.method as string);
                    } else if (isMod) {
                        hasAccessPerm = isMethodAllowed(data.permissions.mods, req.method as string);
                    }
                }
                /**
                 * is allowed if all three of the following are met with
                 * 1. already allowed by previous checks ( api authorization )
                 * 2. user is either the owner or has the entity shared with them or are either an admin or a mod. (user)
                 * 3. current method of access is given as an access permission. (method)
                 */
                isAllowed = isAllowed && (isOwner || isSharedWith || isAdmin || isMod) && hasAccessPerm;
            } else {
                isAllowed = false;
            }
        }
    } else {
        isAllowed = true;
    }

    /**
     * proceed to the handler if allowed.
     * send a 403 if not.
     */
    if (isAllowed) {
        next();
    } else {
        res.status(403).send(createServerError(new Error('unauthorized'), req))
    }


}

