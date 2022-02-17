import { AuthProvider } from "../../../types/enums/providers";
import BaseClientFactory from "../../base.client.factory";
import { IAuthClient } from "../../../types/interfaces/auth.client.interface";
import FirebaseAuthClient from "./providers/firebase.auth.client";
import MockAuthClient from "./providers/mock.auth.client";

export default class AuthClientFactory extends BaseClientFactory<IAuthClient,AuthProvider>{
    protected createClient(provider: AuthProvider): IAuthClient {
        switch(provider){
            case AuthProvider.MOCK:
            default:
                return new MockAuthClient();
            case AuthProvider.FIREBASE:
                return new FirebaseAuthClient();
        }
    }


}