/**
 * Auth services for firebase authentication
 * based on firebase admin sdk
 */

import userEntity from "../../../../data/entities/user.entity";
import admin from "firebase-admin";
import { SessionDto } from "../../../../types/dtos/auth.dtos";
import { UserRole } from "../../../../types/dtos/user.dtos";
import { OAuthProviders } from "../../../../types/enums/providers";
import { IAuthService } from "../../../../types/interfaces/auth.service.interface";
import init from "../../../../libs/firebase.admin.sdk";

export default class FirebaseAuthService implements IAuthService {
  private admin: admin.app.App;
  serverPrivateKey: string;

  constructor(pvtKey: string) {
    this.serverPrivateKey = pvtKey;
    // should only be initialized in the server.
    this.admin = init();
  }

  createSessionWithEmail(email: string, password: string): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  createSessionWithFederation(
    oAuthToken: string,
    oAuthProvider: OAuthProviders
  ): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  revokeSession(session: SessionDto, accessToken: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createUser(email: string, role: UserRole): Promise<userEntity> {
    throw new Error("Method not implemented.");
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
