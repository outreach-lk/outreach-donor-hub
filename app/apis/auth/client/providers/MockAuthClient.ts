import { rejects } from "assert";
import { LocalSession, SessionDto } from "../../../../types/dtos/auth.dtos";
import { ServerMessageDto } from "../../../../types/dtos/server.message.dtos";
import { UserDto, UserRole } from "../../../../types/dtos/user.dtos";
import { AuthProvider } from "../../../../types/enums/providers";
import { IAuthClient } from "../../../../types/interfaces/auth.client.interface";

/**
 * A mock authentication client that make no network calls nor any actual authentication logic
 * to be used for ui development and testing only.
 */
export default class MockAuthClient implements IAuthClient {
  private data = {
    logins: [
      {
        email: "user@outreach.lk",
        password: "password",
        role: "user",
      },
      {
        email: "mod@outreach.lk",
        password: "password",
        role: "moderator",
      },
      {
        email: "admin@outreach.lk",
        password: "password",
        role: "admin",
      },
    ],
  };

  accessToken: string | undefined;
  refreshToken: string | undefined;
  provider: AuthProvider = AuthProvider.MOCK;

  signInWithEmail(email: string, password: string): Promise<SessionDto> {
    return new Promise((res, rej) => {
      const user = this.data.logins.find(
        (creds) => creds.email === email && creds.password === password
      );
      if (user) {
        res({
          accessToken: "xxxx",
          refreshToken: "yyyy",
          user: {
            email,
          },
        } as SessionDto);
      } else {
        rej(new Error("invalid_credentials"));
      }
    });
  }
  signInWithGoogle(): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  signInWithFacebook(): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  signUpWithEmail(
    email: string,
    password: string,
    role: UserRole
  ): Promise<SessionDto> {
    return new Promise((res,rej) => {
        const existing = this.data.logins.find((u) => u.email === email);
        if(!existing) {
            res({
              accessToken: "xxxxx",
              refreshToken: "yyyy",
              user: {
                email,
                role
              } as UserDto,
            });
        }else{
            rej(new Error("USER EXISTS"))
        }
      });
    
  }
  confirmSignup(): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  requestPwdReset(email: string): Promise<ServerMessageDto<any>> {
    throw new Error("Method not implemented.");
  }
  confirmPwdReset(
    email: string,
    code: string,
    newPassword: string
  ): Promise<ServerMessageDto<any>>{
    throw new Error("Method not implemented.");
  }
  refresh(refreshToken: string): Promise<SessionDto> {
    throw new Error("Method not implemented.");
  }
  changePassword(oldPassword: string, newPassword: string): Promise<SessionDto>{
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteAccount(): Promise<ServerMessageDto<any>> {
    throw new Error("Method not implemented.");
  }
}
