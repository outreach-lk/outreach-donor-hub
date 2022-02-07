import { SessionDto } from "../../../../types/dtos/auth.dtos";
import { ServerMessageDto } from "../../../../types/dtos/server.message.dtos";
import { UserRole } from "../../../../types/dtos/user.dtos";
import { AuthProvider } from "../../../../types/enums/providers";
import { IAuthClient } from "../../../../types/interfaces/auth.client.interface";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  signInWithCustomToken,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import apis from "../../../api-map.json";

/** Authentication Client for Provider Firebase */
export default class FirebaseAuthClient implements IAuthClient {
  private auth: Auth;
  constructor() {
    this.auth = getAuth();
  }
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

  signInWithEmail(email: string, password: string): Promise<SessionDto> {
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
          console.log(res);
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
          console.log(err);
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
    throw new Error("Method not implemented.");
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
