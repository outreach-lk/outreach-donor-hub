import { UserDto } from "../../../../types/dtos/user.dtos";
import { AuthProvider } from "../../../../types/enums/providers";
import { IAuthClient } from "../../../../types/interfaces/auth.client.interface";

export default class NextAuthClient implements IAuthClient{
    accessToken: string | undefined;
    refreshToken: string | undefined;
    provider: AuthProvider = AuthProvider.NEXTAUTH;
    signInWithEmail(email: string, password: string): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    signInWithGoogle(): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    signInWithFacebook(): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    confirmSignup(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    requestPwdReset(email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    confirmPwdReset(email: string, code: string, newPassword: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    refresh(refreshToken: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    changePassword(newPassword: string): Promise<void>;
    changePassword(oldPassword: any, newPassword?: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteAccount(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}