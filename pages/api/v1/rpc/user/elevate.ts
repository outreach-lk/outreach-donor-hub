/**
 * handler for elevating user privileges
 */

import { NextApiRequest, NextApiResponse } from "next";
import { withCustomMiddleware } from "../../../../../app/api/middleware/wrapper";
import UserRepo from "../../../../../app/data/repos/user.repo";
import { UserDto, UserRole } from "../../../../../app/types/dtos/user.dtos";
import { createServerError, createServerMessage } from "../../../../../app/utils/create-server-response";

export function handler(req:NextApiRequest, res: NextApiResponse) {
    const {uid,targetRole} = req.body;
    if(uid&&targetRole){
        UserRepo.getRepo().update(uid,{role:targetRole as UserRole} as UserDto)
        .then(() => {
            res.status(200).send(createServerMessage(`user ${uid} elevated to ${targetRole}`,req))
        })
        .catch(error=>{
            res.status(500).send(createServerError(error as Error,req,500))
        })
    }else{
        res.status(400).send(createServerError(new Error('user id & target role are required'),req,400))
    }
}   

export default withCustomMiddleware(handler);
export const config = {
    api: {
      externalResolver: true
    }
  }