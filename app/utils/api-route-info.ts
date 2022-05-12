import { NextApiRequest } from "next";
import { getConfig } from "../config";
import { UserRole } from "../types/dtos/user.dtos";
import { AccessPerms } from "../types/ownable";

/**
 * Returns the basic information about an api route from the path.
 * @param path
 * @returns
 */
export function getRouteInfo(req: NextApiRequest): ApiRouteInfo {
  console.log(req.url);
  let pathToMatch: string;
  if (req.query.entity && req.query.id) {
    pathToMatch = `/api/v1/${req.query.entity as string}/:id`;
  } else if (req.query.entity) {
    pathToMatch = `/api/v1/${req.query.entity as string}`;
  } else {
    pathToMatch = req.url as string;
  }

  //remove query params
  if (pathToMatch.includes("?")) {
    pathToMatch = pathToMatch.split("?")[0];
  }
  const route = getConfig().routes.find(
    (r) =>
      r.path.match(pathToMatch as string) &&
      r.isApi === true &&
      r.apiMethod === req.method
  );
  if (route) {
    return {
      isEntity: route.isEntity,
      isProtected: route.isProtected,
      allowedRoles: route.allowedRoles,
      path: route.path,
      entitySignature: route.isEntity
        ? {
            entityType: req.query.entity,
            entityId: req.query.id,
          }
        : null,
    } as ApiRouteInfo;
  } else {
    throw new Error("invalid_path");
  }
}

/**
 * Check if a request is allowed given the available access permissions.
 * Access permissions are modes & methods of interactions with an entity.
 * @param perms
 * @param method
 */
export function isMethodAllowed(perms: AccessPerms[], method: string): boolean {
  /**
   * The type of access action as implied by the request method.
   */
  let accessType: AccessPerms;
  switch (method) {
    case "GET":
      accessType = AccessPerms.READ;
      break;
    case "POST":
      accessType = AccessPerms.WRITE;
      break;
    case "DELETE":
      accessType = AccessPerms.DELETE;
      break;
    case "PUT":
      accessType = AccessPerms.MODIFY;
      break;
    default:
      throw new Error("invalid_access_method");
  }
  if (perms) {
    return perms.includes(accessType);
  } else {
    throw new Error("malformed_entity");
  }
}

/**
 * Type Def. for API Route Info
 * TODO: Move to types directory
 */
export type ApiRouteInfo = {
  path: string;
  isProtected: boolean;
  isEntity: boolean;
  allowedRoles: UserRole[];
  entitySignature?: EntitySignature;
};

export type EntitySignature = {
  entityType: string;
  entityId: string;
};
