// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authServiceFactory } from '../../../../app/apis'
import { SessionDto } from '../../../../app/types/dtos/auth.dtos';
import { ServerMessageDto } from '../../../../app/types/dtos/server.message.dtos';
import { createServerError, createServerMessage } from '../../../../app/utils/create-server-response';

export type body  = {
   session: SessionDto
}
const auth = authServiceFactory.getService(process.env.SERVER_PRIVATE_KEY as string);

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse<ServerMessageDto< null|Error>>
) {
  if(req.method === 'POST'){
    auth.revokeSession((req.body as body).session, req.headers.authorization as string)
    .then(()=> res.send(createServerMessage<null>(null,req)))
    .catch(error => res.send(createServerError(error as Error,req)))
  } else {
    const error = new Error('invalid_method_error');
    res.status(407).send(createServerError(error,req))
  }
}
