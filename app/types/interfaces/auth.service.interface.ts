/**
 * Defines types & interface(s) relavent to all auth related server side functions.
 * @kulathilake
 */
import User from "../../data/entities/user.entity";
import { SessionDto } from "../dtos/auth.dtos";
import { UserDto, UserRole } from "../dtos/user.dtos";
import { OAuthProviders } from "../enums/providers";
import IAPIService from "./api.service.interface";

/** All auth provider clients must implement this interface */
export interface IAuthService extends IAPIService {
  authenticatedUser?: User;
  /**
   * creates a user session for valid user credentials
   * @param email user email.
   * @param password user password
   */
  createSessionWithEmail(email: string, password: string): Promise<SessionDto>;

  /**
   * creates a user session for valid oAuthTokens from federation providers
   * @param oAuthToken token issued by the OAuth provider
   * @param oAuthProvider OAuth provider
   */
  createSessionWithFederation(
    oAuthToken: string,
    oAuthProvider: OAuthProviders
  ): Promise<SessionDto>;

  /**
   * revokes an active user session by invalidating the accessToken
   *
   * Note: actual revocation may not happen for stateless sessions.
   * this behaviour depends on the overall auth implementation.
   *
   * @param session current session with or without the accessToken
   * @param accessToken current accesstoken. can differ from accessToken 
   * in the session to allow remote session revoking (depends on implementation).
   */
  revokeSession(session: SessionDto, accessToken: string): Promise<void>;

  /**
   * creates a new user entity based on an email and a role.
   * @param email email of the new user
   * @param role role of the new user
   */
  createUser(email: string, role: UserRole,token:string): Promise<UserDto>;

  /**
   * Finds a user by their email.
   * @param email email to query with
   */
  findUserByEmail(email: string): Promise<User>;

  /**
   * Finds a user by their user id (uid)
   * @param uid uid to query with
   */
  findUserByUid(uid: string): Promise<User>;

  /**
   * Finds a user by a given token
   * @param token 
   */
  findUserByToken(token: string): Promise<User>

  /**
   * Updates a user password with a given user instance.
   * @param user user instance, with a valid uid
   * @returns the same user instance in the argument.
   */
  updateUserPassword(newPassword: string): Promise<User>;

  /**
   * validates if a request on a given path with a given method is allowed for
   * a user session identified by the accesstoken. 
   * 
   * Additional validations may be required to ensure access to resources.
   * 
   * @param path request path.
   * @param method request method.
   * @param accessToken accessToken in request authorization header.
   */
  isActionAllowed(
    path: string,
    method: string,
    accessToken: string
  ): Promise<boolean>;
}
