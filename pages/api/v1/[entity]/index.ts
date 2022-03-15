/**
 * Entity API handlers for 
 * Fetch Entity Page (GET)
 * Create Entity (POST)
 */

import { NextApiRequest, NextApiResponse } from "next";
import { EntityCreatedDto, EntityFetchedPageDto } from "../../../../app/types/dtos/server-message.dtos";
import { createServerError } from "../../../../app/utils/create-server-response";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        EntityFetchedPageDto<any> |
        EntityCreatedDto<any>
    >
) {
    if (req.method === 'GET') {
        // TODO: Handle Fetch Page
    } else if (req.method === 'POST') {
        // TODO: Handle Create Entity
    } else {
        const error = new Error("invalid_method_error");
        res.status(407).send(createServerError(error, req));
    }
}