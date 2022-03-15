import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequestMiddlewareChain } from "./middleware-chain";
import { permissionCheck } from "./perm-check";
import { serverLogger } from "./server-logger";

/**
 * A wrapper for nextjs api handlers, to enable express like middleware capabilities.
 * @param handler 
 * @returns a NextApiHandler function
 */
export function withCustomMiddleware(handler: NextApiHandler): NextApiHandler{
    return (req: NextApiRequest, res: NextApiResponse) => {
        new NextRequestMiddlewareChain(handler)
        .use(serverLogger)
        .use(permissionCheck)
        .call(req,res)
    }
}