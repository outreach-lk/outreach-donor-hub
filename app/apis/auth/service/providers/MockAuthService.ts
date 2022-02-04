import { OAuthProvider } from "next-auth/providers";
import userDao from "../../../../data/entities/user.dao";
import { SessionDto } from "../../../../types/dtos/auth.dtos";
import { ServerMessageDto } from "../../../../types/dtos/server.message.dtos";
import { UserRole } from "../../../../types/dtos/user.dtos";
import { AuthProvider, OAuthProviders } from "../../../../types/enums/providers";
import { IAuthService } from "../../../../types/interfaces/auth.service.interface";

export default class MockAuthService implements IAuthService{
    serverPrivateKey: string;

    constructor(pvtkey:string){
        this.serverPrivateKey = pvtkey;
    }
    findUser(email: string): Promise<userDao> {
        throw new Error("Method not implemented.");
    }
    updateUser(user: userDao): Promise<userDao> {
        throw new Error("Method not implemented.");
    }
    createUser(email: string, role: UserRole): Promise<userDao> {
        throw new Error("Method not implemented.");
    }
    createSessionWithEmail(email: string, password: string): Promise<SessionDto> {
        throw new Error("Method not implemented.");
    }
    createSessionWithFederation(oAuthToken: string, oAuthProvider: OAuthProviders): Promise<SessionDto> {
        throw new Error("Method not implemented.");
    }
    revokeSession(session: SessionDto, accessToken: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}