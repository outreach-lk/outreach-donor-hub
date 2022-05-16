import { Dispatch, SetStateAction } from "react";
import { UserDto } from "./user.dtos";

export type AccessTokenPayload = {
    uid: string,
    sessionId: string,
    permissions: Permissions[],
    serverTime: number,
    expiresIn: number,
    user: UserDto
}

export type SessionDto = {
    sessionId: string,
    accessToken: string,
    refreshToken: string,
    user: UserDto
}

export type LocalSession = SessionDto & {
    isAuthorized: boolean;
}

export type LocalSessionContext = LocalSession & {
    setSession: Dispatch<SetStateAction<LocalSession>>
}