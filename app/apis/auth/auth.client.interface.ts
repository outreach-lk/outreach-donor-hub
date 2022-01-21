/**
 * Defines types & interface(s) relavent to all auth related client side functions.
 */
import { UserDto } from "../../types/dtos/userDtos";

/** All auth provider clients must implement this interface */
export interface IAuthClient {
    signInWithEmail(email:string, password:string): Promise<UserDto>
    signInWithGoogle(): Promise<UserDto>
    signInWithFacebook(): Promise<UserDto>
    confirmSignup(): Promise<void>
    requestPwdReset(email:string): Promise<void>
    confirmPwdReset(email:string, code:string, newPassword:string): Promise<void>
    /**
     * Performs refresh token on provider and sets accesstoken
     * @param refreshToken 
     */
    refresh(refreshToken:string): Promise<void>;  
    changePassword(oldPassword:string, newPassword: string): Promise<void>
    changePassword(newPassword:string): Promise<void>
    logout(): Promise<void>
    deleteAccount(): Promise<void>
}

