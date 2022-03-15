import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { RequestMiddlewareChain } from "./middleware/middleware-chain";
import { permissionCheck } from "./middleware/perm-check";
import { serverLogger } from "./middleware/server-logger";

/**
 * A wrapper for nextjs api handlers, to enable express like middleware capabilities.
 * @param handler 
 * @returns a NextApiHandler function
 */
export function apiWrapper(handler: NextApiHandler): NextApiHandler{
    return (req: NextApiRequest, res: NextApiResponse) => {
        new RequestMiddlewareChain(handler)
        .use(serverLogger)
        .use(permissionCheck)
        .call(req,res)
    }
}