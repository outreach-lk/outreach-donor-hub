import { SessionDto } from "../../../../types/dtos/auth.dtos";
import { ServerMessageDto } from "../../../../types/dtos/server-message.dtos";
import { UserDto, UserRole } from "../../../../types/dtos/user.dtos";
import { AuthProvider } from "../../../../types/enums/providers";
import { IAuthClient } from "../../../../types/interfaces/auth.client.interface";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import axios from "axios";
import apis from "../../../api-map.json";
import app from "../../../../libs/firebase.client.sdk";
import User from "../../../../data/entities/user.entity";
import UserRepo from "../../../../data/repos/user.repo";

/** Authentication Client for Provider Firebase */
export default class FirebaseAuthClient implements IAuthClient {
  private auth: Auth;
  constructor() {
    this.auth = getAuth(app);
  }
  /**
   * Signs in the user and creates a session with a custom token to suit the needs of
   * the application using a token issued by firebase client when the user
   * signs in with email, google, or facebook.
   * @param token Valid token issued by the firebase native auth system
   * @returns {SessionDto} new SesssionDTO.
   */
  private async firebaseSignInWithCustomToken(
    token: string
  ): Promise<SessionDto> {
    try {
      const { data } = (
        await axios.post(
          apis.v1.auth.login.firebase["custom-token"].path,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        )
      ).data as ServerMessageDto<SessionDto>;
      if (data) {
        return signInWithCustomToken(this.auth, data?.accessToken).then(
          (res) => {
            if (res.user) {
              this.accessToken = data.accessToken;
              this.refreshToken = res.user.refreshToken;
              return data;
            } else {
              throw new Error();
            }
          }
        );
      } else {
        throw new Error();
      }
    } catch (error) {
      throw error as Error;
    }
  }

  signInWithEmail(
    email: string,
    password: string,
    persist?: boolean
  ): Promise<SessionDto> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        return res.user
          .getIdToken()
          .then((token) => {
            return this.firebaseSignInWithCustomToken(token);
          })
          .catch((error) => {
            throw error as Error;
          });
      })
      .catch((err) => {
        throw err as Error;
      });
  }

  signInWithGoogle(): Promise<SessionDto> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((res) => {
        return res.user
          .getIdToken()
          .then((token) => {
            return this.firebaseSignInWithCustomToken(token);
          })
          .catch((error) => {
            throw error as Error;
          });
      })
      .catch((err) => {
        throw err as Error;
      });
  }
  signInWithFacebook(): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  signUpWithEmail(
    email: string,
    password: string,
    role: UserRole
  ): Promise<SessionDto> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        if (res?.user) {
          return UserRepo.getRepo()
            .create({
              uid: res.user.uid,
              email: res.user.email,
              role: role
            } as UserDto)
            .then(() => {
              return res.user
                .getIdToken()
                .then((token) => {
                  return this.firebaseSignInWithCustomToken(token);
                })
                .catch((error) => {
                  throw new Error(error); //FIXME: Handle Exception or throw meaningful error.
                });
            })
            .catch(error=>{
              throw new Error(error); //FIXME: Handle Exception or throw meaningful error.
            })
        } else {
          throw new Error("Sign up failed"); //FIXME: Handle Exception or throw meaningful error.
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  confirmSignup(email: string, code: string): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  requestPwdReset(email: string): Promise<ServerMessageDto<any>> {
    throw new Error("Method not implemented.");
  }
  confirmPwdReset(
    email: string,
    code: string,
    newPassword: string
  ): Promise<ServerMessageDto<any>> {
    throw new Error("Method not implemented.");
  }
  refresh(refreshToken: string): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteAccount(): Promise<ServerMessageDto<any>> {
    throw new Error("Method not implemented.");
  }
  accessToken: string | undefined;
  refreshToken: string | undefined;
  provider: AuthProvider = AuthProvider.FIREBASE;
}
