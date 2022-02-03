/**
 * Defines types & interface(s) relavent to all auth related client side functions.
 */
import { LocalSession, SessionDto } from "../dtos/auth.dtos";
import { UserDto, UserRole } from "../dtos/user.dtos";
import { AuthProvider } from "../enums/providers";
import { IAPIClient } from "./api.client.interface";

/** All auth provider clients must implement this interface */
export interface IAuthClient extends IAPIClient<AuthProvider> {
    signInWithEmail(email:string, password:string): Promise<SessionDto>
    signInWithGoogle(): Promise<SessionDto>
    signInWithFacebook(): Promise<SessionDto>

    signUpWithEmail(email:string, password:string, role: UserRole): Promise<SessionDto>
    confirmSignup(): Promise<void>
    requestPwdReset(email:string): Promise<void>
    confirmPwdReset(email:string, code:string, newPassword:string): Promise<void>
    /**
     * Performs refresh token on provider and sets accesstoken
     * @param refreshToken 
     */
    refresh(refreshToken:string): Promise<void>;  
    changePassword(oldPassword:string, newPassword: string): Promise<void>
    logout(): Promise<void>
    deleteAccount(): Promise<void>
}

