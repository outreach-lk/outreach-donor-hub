import { NextApiRequest, NextApiResponse } from "next/types";

export type ApiMiddleware = (
    req: NextApiRequest, 
    res: NextApiResponse, 
    next: CallNextHandler,
    error?: any
    ) => void | Promise<void>


export type CallNextHandler = (error?:any)=>void;