import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiMiddleware } from "../../types/middleware";
import { NextRequestMiddlewareChain } from "./middleware-chain";
import { permissionCheck } from "./perm-check";
import { requestLogger } from "./server-logger";

/**
 * A wrapper for nextjs api handlers, to enable express like middleware capabilities.
 * @param handler 
 * @returns a NextApiHandler function
 */
export function withCustomMiddleware(handler: NextApiHandler): NextApiHandler{
    return (req: NextApiRequest, res: NextApiResponse) => {
        void new NextRequestMiddlewareChain(handler)
        .use(requestLogger as ApiMiddleware)
        .use(permissionCheck)
        .call(req,res)
    }
}