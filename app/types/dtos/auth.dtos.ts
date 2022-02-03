import { UserDto } from "./user.dtos";

export type SessionDto = {
    accessToken: string,
    refreshToken: string,
    user: UserDto
}