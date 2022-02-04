/**
 * Defines types & interface(s) relavent to all auth related server side functions.
 */
 import { OAuthProvider } from "next-auth/providers";
import User from "../../data/entities/user.dao";
import { SessionDto } from "../dtos/auth.dtos";
import { UserRole } from "../dtos/user.dtos";
import { OAuthProviders } from "../enums/providers";
import IAPIService from "./api.service.interface";
import { IAuthClient } from "./auth.client.interface";
 
 /** All auth provider clients must implement this interface */
 export interface IAuthService extends IAPIService{
    createSessionWithEmail(email:string, password:string):Promise<SessionDto>;
    createSessionWithFederation(oAuthToken: string, oAuthProvider: OAuthProviders): Promise<SessionDto>;
    revokeSession(session:SessionDto, accessToken: string): Promise<void>;
    createUser(email:string, role: UserRole): Promise<User>;
    findUser(email:string): Promise<User>;
    /** Updates user data in the database including password*/
    updateUser(user: User): Promise<User>;
 }
 
 