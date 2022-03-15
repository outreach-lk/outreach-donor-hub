/**
 * Entity API handlers for
 * Fetch Entiry (GET)
 * Update Entity (PUT)
 * Delete Entity (DELETE)
 */

import { NextApiRequest, NextApiResponse } from "next";
import { withCustomMiddleware } from "../../../../../app/api/middleware/wrapper";
import { EntityCreatedDto, EntityDeletedDto, EntityFetchedDto, EntityUpdatedDto } from "../../../../../app/types/dtos/server-message.dtos";
import { createServerError } from "../../../../../app/utils/create-server-response";

function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        EntityFetchedDto<any> |
        EntityCreatedDto<any> |
        EntityDeletedDto<any> |
        EntityUpdatedDto<any>
    >
) {
    
    if (req.method === 'GET') {
        // TODO: Handle Fetch Entity
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