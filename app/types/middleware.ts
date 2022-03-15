import { NextApiHandler, NextApiRequest, NextApiResponse } from "next/types";

export type ApiMiddleware = (
    req: NextApiRequest, 
    res: NextApiResponse, 
    next: CallNextHandler ) => void | Promise<void>


export type CallNextHandler = ()=>void;