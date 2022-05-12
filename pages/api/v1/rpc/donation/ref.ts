/**
 * Returns a unique reference id for a user
 */

import { NextApiRequest, NextApiResponse } from "next";
import { withCustomMiddleware } from "../../../../../app/api/middleware/wrapper";
import { createServerError, createServerMessage } from "../../../../../app/utils/create-server-response";
import { generateUniqueDonorRefId } from "../../../../../app/utils/generate-ids";

function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        const { cause, user } = req.body;
        const ref = generateUniqueDonorRefId(cause, user);
        res.send(createServerMessage(ref,req));
    } else {
        const error = new Error("invalid_method_error");
        res.status(407).send(createServerError(error, req));
    }
}

export default withCustomMiddleware(handler);
export const config = {
    api: {
      externalResolver: true
    }
  }

