/**
 * Defines types & interface(s) relavent to all auth related client side functions.
 */
import { LocalSession, SessionDto } from "../dtos/auth.dtos";
import { ServerMessageDto } from "../dtos/server.message.dtos";
import { UserDto, UserRole } from "../dtos/user.dtos";
import { AuthProvider } from "../enums/providers";
import { IAPIClient } from "./api.client.interface";

/** All auth provider clients must implement this interface */
export interface IAuthClient extends IAPIClient<AuthProvider> {
    signInWithEmail(email:string, password:string): Promise<SessionDto>
    signInWithGoogle(): Promise<SessionDto>
    signInWithFacebook(): Promise<SessionDto>

    signUpWithEmail(email:string, password:string, role: UserRole): Promise<SessionDto>
    confirmSignup(email:string , code: string): Promise<SessionDto>
    requestPwdReset(email:string): Promise<ServerMessageDto<any>> //TODO create a DTO.
    confirmPwdReset(email:string, code:string, newPassword:string): Promise<ServerMessageDto<any>> //
    /**
     * Performs refresh token on provider and sets accesstoken
     * @param refreshToken 
     */
    refresh(refreshToken:string): Promise<SessionDto>;  
    changePassword(oldPassword:string, newPassword: string): Promise<SessionDto>
    logout(): Promise<void>
    deleteAccount(): Promise<ServerMessageDto<any>> //TODO create a dto.
}

