/**
 * Fetche
 */
import { NextApiRequest, NextApiResponse } from "next";
import { withCustomMiddleware } from "../../../app/api/middleware/wrapper";
import EventRepo from "../../../app/data/repos/event.repo";
import {
  createServerError,
  createServerMessage,
} from "../../../app/utils/create-server-response";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from, limit, topic } = req.query;
  const queryMap = new Map<string,string>();
  queryMap.set('topic',topic as string);
  EventRepo.getRepo()
    .getPage(
      {
        limit: parseInt((limit as string) || "8"),
        start: from as string,
      },
      queryMap
    )
    .then((data) => {
      res.status(200).send(createServerMessage(data, req));
    })
    .catch((error: Error) => {
      res.status(500).send(createServerError(error, req));
    });
}

export default withCustomMiddleware(handler);
export const config = {
  api: {
    externalResolver: true
  }
}