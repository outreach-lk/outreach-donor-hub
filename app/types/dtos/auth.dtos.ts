import { Dispatch, SetStateAction } from "react";
import { UserDto } from "./user.dtos";

export type AccessTokenPayload = {
    user: UserDto,
    permissions: Permissions[],
    serverTime: number,
    expiresIn: number,
    refreshToken: string
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