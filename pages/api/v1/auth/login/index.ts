// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authServiceFactory } from "../../../../../app/apis/services";
import { SessionDto } from "../../../../../app/types/dtos/auth.dtos";
import { ServerMessageDto } from "../../../../../app/types/dtos/server.message.dtos";
import {
  createServerError,
  createServerMessage,
} from "../../../../../app/utils/create-server-response";

export type body = {
  email: string;
  password: string;
};
const auth = authServiceFactory.getService(
  process.env.SERVER_PRIVATE_KEY as string
);

export default function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<ServerMessageDto<SessionDto | Error>>
) {
  if (req.method === "POST") {
    auth
      .createSessionWithEmail(
        (req.body as body).email,
        (req.body as body).password
      )
      .then((session) =>
        res.send(createServerMessage<SessionDto>(session, req))
      )
      .catch((error) => res.send(createServerError(error as Error, req)));
  } else {
    const error = new Error("invalid_method_error");
    res.status(407).send(createServerError(error, req));
  }
}
