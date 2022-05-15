// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbServiceFactory from "../../../../../app/api/database/service/db.service.factory";
import { authServiceFactory } from "../../../../../app/api/services";
import User from "../../../../../app/data/entities/user.entity";
import { SessionDto } from "../../../../../app/types/dtos/auth.dtos";
import { ServerMessageDto } from "../../../../../app/types/dtos/server-message.dtos";
import { UserDto, UserRole } from "../../../../../app/types/dtos/user.dtos";
import { AuthProvider, DatabaseProvider } from "../../../../../app/types/enums/providers";
import {
  createServerError,
  createServerMessage,
} from "../../../../../app/utils/create-server-response";

export type body = {
  email: string;
  password: string;
  role: UserRole;
};

const auth = authServiceFactory.getService(
  process.env.SERVER_PRIVATE_KEY as string,
  AuthProvider.FIREBASE
);

export default function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse<ServerMessageDto<UserDto | Error>>
) {
  if (req.method === "POST") {
    let token = req.headers.authorization;
    if(token){
      const prefix = 'Bearer '
      token = token.slice(prefix.length);
      auth
      .createUser((req.body as body).email, (req.body as body).role,token)
      .then((user) => {
        auth
        res.send(createServerMessage<UserDto>(user, req))
          // .createSessionWithEmail(user.email, (req.body as body).password)
          // .then((session) =>
          // )
          // .catch((error) => res.send(createServerError(error as Error, req)));
      })
      .catch((error) => res.status(500).send(createServerError(error as Error, req)));
    }else{
      res.status(403).send(createServerError( {message:'unauthorized'} as Error, req));
    }
    
  } else {
    const error = new Error("invalid_method_error");
    res.status(407).send(createServerError(error, req));
  }
}
