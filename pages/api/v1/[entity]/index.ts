/**
 * Entity API handlers for 
 * Fetch Entity Page (GET)
 * Create Entity (POST)
 */

import { NextApiRequest, NextApiResponse } from "next";
import { getRepoFromEntityName } from "../../../../app/data/repos/name-repo-mapper";
import { EntityCreatedDto, EntityFetchedPageDto } from "../../../../app/types/dtos/server-message.dtos";
import ICRUDREPO from "../../../../app/types/interfaces/crud.repo.interface";
import { createServerError, createServerMessage } from "../../../../app/utils/create-server-response";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        EntityFetchedPageDto<any> |
        EntityCreatedDto<any>
    >
) {
    try {
        const {entity} = req.query;
        // console.log(CauseRepo)
        const repo: ICRUDREPO<any> = getRepoFromEntityName( entity as string );
        if (req.method === 'GET') {
            // TODO: Handle Fetch Page
        } else if (req.method === 'POST') {
            repo.create(req.body)
            .then(data=>{
                res.status(201).send(createServerMessage(data,req));
            })
            .catch(console.log)
        } else {
            const error = new Error("invalid_method_error");
            res.status(407).send(createServerError(error, req));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(createServerError(error as Error, req));
    }
}

// export default withCustomMiddleware(handler);