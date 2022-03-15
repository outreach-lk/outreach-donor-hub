import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import BaseEntity from "../../data/entities/base.entity";
import { UserRole } from "../../types/dtos/user.dtos";
import { getRouteInfo, isMethodAllowed } from "../../utils/api-route-info";
import { createServerError } from "../../utils/create-server-response";
import { fetchEntityFromSignature } from "../../data/entities/signature-entity-mapper";
import { tokenInterceptor } from "../../utils/token-interceptor";

/**
 * Checks if access to 
 * @param req 
 * @param res 
 * @param handler 
 */
export async function withRoutePermissions(req: NextApiRequest, res: NextApiResponse, handler: NextApiHandler) {
    let isAllowed: boolean = false;
    const user = await tokenInterceptor(req);
    const { isEntity, entitySignature, allowedRoles, isProtected } = getRouteInfo(new URL(req.url as string, req.headers.host), req.method as string);
    /**
     * Unless the route isProtected always set isAllowed to true.
     * If not, continue to the rest of the checks.
     */
    if( isProtected ) {
        /**
         * isAllowed is set to true If the requesting user has a role 
         * that is in the allowed roles list
         */
        if(user && user.role){
            isAllowed = isAllowed && ( allowedRoles.indexOf(user.role) > -1 )
        } else if ( allowedRoles.length ) {
            isAllowed = false 
        }

        /**
         * If the route points to an entity, fetch the said entity's 
         * owner, permissions & sharedWith details.
         */
        if(isEntity && entitySignature ) {
            const data = await fetchEntityFromSignature( entitySignature );
            let isOwner: boolean = false;
            let isSharedWith: boolean = false; 
            let hasAccessPerm: boolean = false
            if( user ) {
                isOwner = ( data.owner === user );
                if(data.sharedWith) {
                    // FIXME: indexOf may not work properly
                    isSharedWith = (data.sharedWith?.indexOf( user ) > -1)
                }
                if(data.permissions){
                    if(isOwner){
                        hasAccessPerm = isMethodAllowed(data.permissions.owner, req.method as string);
                    } else if ( isSharedWith ) {
                        hasAccessPerm = isMethodAllowed(data.permissions.shared, req.method as string);
                    } else if ( user.role === UserRole.ADMIN) {
                        hasAccessPerm = isMethodAllowed(data.permissions.admins, req.method as string);
                    } else if ( user.role === UserRole.MODERATOR ) {
                        hasAccessPerm = isMethodAllowed(data.permissions.mods, req.method as string);
                    } 
                }
            } else {
                isAllowed = false;
            }
        }
    } else {
        isAllowed = true;
    }

    if (isAllowed) {
        handler(req, res);
    } else {
        res.status(403).send(createServerError(new Error('unauthorized'), req))
    }


}