import { AccessPerms } from "../types/ownable";
import { EntitySignature } from "./api-route-info";

export function getEntityDefaultPermissions(entity?: string) {
  switch (entity) {
    case "donation":
        return {
            owner: [AccessPerms.READ, AccessPerms.DELETE],
            shared: [AccessPerms.READ, AccessPerms.MODIFY],
            mods: [AccessPerms.MODIFY, AccessPerms.READ],
            admins: [AccessPerms.MODIFY, AccessPerms.READ, AccessPerms.DELETE],
        }
    default:
      return {
        owner: [AccessPerms.MODIFY, AccessPerms.READ, AccessPerms.DELETE],
        shared: [AccessPerms.READ, AccessPerms.MODIFY],
        mods: [AccessPerms.MODIFY, AccessPerms.READ],
        admins: [AccessPerms.MODIFY, AccessPerms.READ, AccessPerms.DELETE],
      };
  }
}
