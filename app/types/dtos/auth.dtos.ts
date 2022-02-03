import { Dispatch, SetStateAction } from "react";
import { UserDto } from "./user.dtos";

export type SessionDto = {
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