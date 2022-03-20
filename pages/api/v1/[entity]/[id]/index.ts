/**
 * Entity API handlers for
 * Fetch Entiry (GET)
 * Update Entity (PUT)
 * Delete Entity (DELETE)
 */

import { NextApiRequest, NextApiResponse } from "next";
import { withCustomMiddleware } from "../../../../../app/api/middleware/wrapper";
import { EntityCreatedDto, EntityDeletedDto, EntityFetchedDto, EntityUpdatedDto } from "../../../../../app/types/dtos/server-message.dtos";
import ICRUDREPO from "../../../../../app/types/interfaces/crud.repo.interface";
import { createServerError, createServerMessage } from "../../../../../app/utils/create-server-response";
import { getRepoFromEntityName } from "../../../../../app/utils/name-repo-mapper";

function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        EntityFetchedDto<any> |
        EntityCreatedDto<any> |
        EntityDeletedDto<any> |
        EntityUpdatedDto<any>
    >
) {
    const {entity, id} = req.query
    const repo: ICRUDREPO<any> = getRepoFromEntityName( entity as string );
    if (req.method === 'GET' && id) {
        repo.get(id as string)
        .then(data=>{
            res.status(200).send(createServerMessage(data,req))
        })
        .catch((error: Error)=>{
            res.status(500).send(createServerError(error,req))
        })
    } else if (req.method === 'PUT') {
        // TODO: Handle Update Entity
    } else if (req.method === 'DELETE') {
        // TODO: Handle Delete Entity
    } else {
        const error = new Error("invalid_method_error");
        res.status(407).send(createServerError(error, req));
    }

}

export default withCustomMiddleware(handler);