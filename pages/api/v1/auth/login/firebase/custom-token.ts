// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authServiceFactory } from "../../../../../../app/apis/services";
import FirebaseAuthService from "../../../../../../app/apis/auth/service/providers/FirebaseAuthService";
import { SessionDto } from "../../../../../../app/types/dtos/auth.dtos";
import { ServerMessageDto } from "../../../../../../app/types/dtos/server.message.dtos";
import { AuthProvider } from "../../../../../../app/types/enums/providers";
import {
  createServerError,
  createServerMessage,
} from "../../../../../../app/utils/create-server-response";

const auth = authServiceFactory.getService(
  process.env.SERVER_PRIVATE_KEY as string,
  AuthProvider.FIREBASE
) as FirebaseAuthService;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerMessageDto<SessionDto | Error>>
) {
  if (req.method === "POST") {
    (auth as FirebaseAuthService)
      .createSessionWithToken(req.headers.authorization as string)
      .then((session) =>
        res.send(createServerMessage<SessionDto>(session, req))
      )
      .catch((error) => res.send(createServerError(error as Error, req)));
  } else {
    const error = new Error("invalid_method_error");
    res.status(407).send(createServerError(error, req));
  }
}

export const config = {
  api: {
    externalResolver: true
  }
}