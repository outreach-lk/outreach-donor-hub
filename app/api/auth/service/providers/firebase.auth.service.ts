/**
 * Auth services for firebase authentication
 * based on firebase admin sdk
 */

import userEntity from "../../../../data/entities/user.entity";
import admin from "firebase-admin";
import {
  AccessTokenPayload,
  SessionDto,
} from "../../../../types/dtos/auth.dtos";
import { UserDto, UserRole } from "../../../../types/dtos/user.dtos";
import { OAuthProviders } from "../../../../types/enums/providers";
import { IAuthService } from "../../../../types/interfaces/auth.service.interface";
import init from "../../../../libs/firebase.admin.sdk";
import User from "../../../../data/entities/user.entity";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { generateSessionId } from "../../../../utils/generate-ids";
import UserRepo from "../../../../data/repos/user.repo";

export default class FirebaseAuthService implements IAuthService {
  private admin: admin.app.App;
  serverPrivateKey: string;

  constructor(pvtKey: string) {
    this.serverPrivateKey = pvtKey;
    // should only be initialized in the server.
    this.admin = init();
  }
  authenticatedUser?: userEntity;
  /**
   * Signs in the user with a custom token.
   * The user must first sign in with the firebase client and obtain a valid token
   * which will be verified against firebase admin sdk to obtain user id and the appropriate 
   * user permissions to return a token.
   * @param token firebase client token from signing in with email & password or federation
   * @returns custom token
   */
  async createSessionWithToken(token: string): Promise<SessionDto> {
    try {
      const user = await this.findUserByToken(token);
      const customToken = await this.admin.auth().createCustomToken(user.uid, {
        serverTime: Date.now(),
        expiresIn: 0, // not configurable
        uid: user.uid,
        permissions: user.customPermissions,
        user: User.map2Dto(user)
      } as AccessTokenPayload);
      return {
        accessToken: customToken,
        refreshToken: 'n/a',
        sessionId: generateSessionId(),
        user: User.map2Dto(user) 
      } as SessionDto
    } catch (error) {
      throw error as Error;
    }
  }

  /**
   * Gets user from a token generated by firebase auth functions
   */
  async findUserByToken(token: string): Promise<User> {
    try {
      const decodedToken: DecodedIdToken = (await this.admin.auth().verifyIdToken(token));
      if(decodedToken){
        return await User.getUserByUid(decodedToken.uid);
      } else {
        throw new Error("Invalid Token");
      }
    } catch (error) {
      console.log(error);
      throw new Error("error fetching user from token");
    }
  }

  createSessionWithEmail(email: string, password: string): Promise<SessionDto> {
    throw new Error("Method not supported by provider.");
  }
  createSessionWithFederation(
    oAuthToken: string,
    oAuthProvider: OAuthProviders
  ): Promise<SessionDto> {
    throw new Error("Method not supported by provider.");
  }
  revokeSession(session: SessionDto, accessToken: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async createUser(email: string, role: UserRole, token: string): Promise<UserDto> {
    const decodedToken: DecodedIdToken = (await this.admin.auth().verifyIdToken(token));
    if(decodedToken){
      return UserRepo.getRepo().create({
        uid: decodedToken.uid,
        email,
        role,
        isEmailVerified: false,
        isVerifiedUser: false,
      } as UserDto)
      .then(res=>{
        if(res.data){
          return res.data
        }else{
          throw new Error('failed to create user')
        }
      })
    }else{
      throw new Error('unauthorized');
    }
  }
  findUserByEmail(email: string): Promise<userEntity> {
    throw new Error("Method not implemented.");
  }
  findUserByUid(uid: string): Promise<userEntity> {
    throw new Error("Method not implemented.");
  }
  updateUserPassword(newPassword: string): Promise<userEntity> {
    throw new Error("Method not implemented.");
  }
  isActionAllowed(
    path: string,
    method: string,
    accessToken: string
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
