import { NextApiRequest, NextApiResponse } from "next";
import { UserRole } from "../../types/dtos/user.dtos";
import { getRouteInfo, isMethodAllowed } from "../../utils/api-route-info";
import { createServerError } from "../../utils/create-server-response";
import { fetchEntityFromSignature } from "../../utils/signature-entity-mapper";
import { tokenInterceptor } from "../../utils/token-interceptor";
import { CallNextHandler } from "../../types/middleware";
import User from "../../data/entities/user.entity";
import databaseServiceFactory from "../database/service/db.service.factory";
import { AuthProvider, DatabaseProvider } from "../../types/enums/providers";
import { authServiceFactory } from "../services";

/**
 * Checks if access to
 * @param req
 * @param res
 * @param handler
 */
export async function permissionCheck(
  req: NextApiRequest,
  res: NextApiResponse,
  next: CallNextHandler
) {
  let isAllowed = false;
  let user: User | null;

  try {
    user = await tokenInterceptor(req);
    const { isEntity, entitySignature, allowedRoles, isProtected } =
      getRouteInfo(req);
    /**
     * Sets Database Service Authenticated User Property
     * for Auditing Purposes
     */
    if (user) {
      databaseServiceFactory.getService(
        DatabaseProvider.FIREBASE
      ).authenticatedUser = user;
      
      authServiceFactory.getService(
        AuthProvider.FIREBASE
      ).authenticatedUser = user;
    }
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
        isAllowed = allowedRoles?.indexOf(user.role) > -1 || true;
      } else {
        isAllowed = false;
      }
      /**
       * If the route points to an entity, fetch the said entity's
       * owner, permissions & sharedWith details.
       * TODO: Cache this Entity somewhere and prevent a second read
       * in the actual handler.
       */
      if (isEntity && entitySignature && entitySignature.entityId) {
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
          isOwner = data.owner === user.uid && data.owner !== undefined;
          if (data.sharedWith) {
            isSharedWith = data.sharedWith?.indexOf(user.uid) > -1;
          }
          if (data.permissions) {
            if (isOwner) {
              hasAccessPerm = isMethodAllowed(
                data.permissions.owner,
                req.method as string
              );
            } else if (!isOwner && isSharedWith) {
              hasAccessPerm = isMethodAllowed(
                data.permissions.shared,
                req.method as string
              );
            } else if (!isOwner && !isSharedWith && isAdmin) {
              hasAccessPerm = isMethodAllowed(
                data.permissions.admins,
                req.method as string
              );
            } else if (!isOwner && !isSharedWith && !isAdmin && isMod) {
              hasAccessPerm = isMethodAllowed(
                data.permissions.mods,
                req.method as string
              );
            }
          }
          /**
           * is allowed if all three of the following are met with
           * 1. already allowed by previous checks ( api authorization )
           * 2. user is either the owner or has the entity shared with them or are either an admin or a mod. (user)
           * 3. current method of access is given as an access permission. (method)
           */
          isAllowed =
            isAllowed &&
            (isOwner || isSharedWith || isAdmin || isMod) &&
            hasAccessPerm;
        } else {
          isAllowed = false;
        }
      }
    } else {
      isAllowed = true;
    }
  } catch (error) {
    isAllowed = false;
    res.status(403).send(createServerError(error as Error, req));
    return;
  }

  /**
   * proceed to the handler if allowed.
   * send a 403 if not.
   */
  if (isAllowed) {
    next();
  } else {
    res.status(403).send(createServerError(new Error("unauthorized"), req));
  }
}
