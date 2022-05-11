/**
 * Entity API handlers for 
 * Fetch Entity Page (GET)
 * Create Entity (POST)
 */

import { NextApiRequest, NextApiResponse } from "next";
import { getRepoFromEntityName } from "../../../../app/utils/name-repo-mapper";
import { EntityCreatedDto, EntityFetchedPageDto } from "../../../../app/types/dtos/server-message.dtos";
import ICRUDREPO from "../../../../app/types/interfaces/crud.repo.interface";
import { createServerError, createServerMessage } from "../../../../app/utils/create-server-response";
import { withCustomMiddleware } from "../../../../app/api/middleware/wrapper";
import { passQueryMapString } from "../../../../app/utils/parse-querystring";


function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        EntityFetchedPageDto<any> |
        EntityCreatedDto<any>
    >
) {
    try {
        let queryMap: Map<string,string|number> | undefined = undefined; // is this stupid?
        const {entity,from,limit,query} = req.query;
        if(query){
            queryMap = passQueryMapString(query as string);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const repo: ICRUDREPO<any> = getRepoFromEntityName( entity as string );
        if (req.method === 'GET') {
            repo.getPage({
                limit: parseInt(limit as string || "8"),
                start: from as string 
            },queryMap)
            .then(data => {
                res.status(200).send(createServerMessage(data,req))
            })
            .catch((error: Error)=>{
                res.status(500).send(createServerError(error,req))
            })
        } else if (req.method === 'POST') {
            repo.create(req.body)
            .then(data=>{
                res.status(201).send(createServerMessage(data,req));
            })
            .catch((error: Error)=>{
                res.status(500).send(createServerError(error,req))
            })
        } else {
            const error = new Error("invalid_method_error");
            res.status(407).send(createServerError(error, req));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(createServerError(error as Error, req));
    }
}

export default withCustomMiddleware(handler);
export const config = {
    api: {
      externalResolver: true
    }
  }