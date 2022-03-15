import { NextApiRequest, NextApiResponse } from "next";
import { CallNextHandler } from "../../types/middleware";

export function serverLogger(req:NextApiRequest,res:NextApiResponse,next:CallNextHandler){
    // TODO: Implement Logger
}