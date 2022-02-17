import { NextApiRequest } from "next";
import { ServerMessageDto } from "../types/dtos/server-message.dtos";

export function createServerMessage<T>(
  data: T,
  req: NextApiRequest,
  code?: number|string,
  message?: string
): ServerMessageDto<T> {
  return {
    code,
    message,
    method: req.method,
    path: req.url,
    wasRequestAuthorized: !!req.headers['authorization'],
    serverTime: new Date(),
    data,
    
  } as ServerMessageDto<T>;
}

export function createServerError(
    error: Error,
    req: NextApiRequest,
    code?: number|string,
    message?: string
  ): ServerMessageDto<Error> {
    console.log(error,message) //FIXME: Delegate to serverside logger
    return {
      code,
      message,
      method: req.method,
      path: req.url,
      wasRequestAuthorized: !!req.headers['authorization'],
      serverTime: new Date(),
      error,
      
    } as ServerMessageDto<Error>;
  }
