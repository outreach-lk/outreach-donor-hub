import { AuthProvider } from "../../types/providers/auth";
import APIClientFactory from "../APIClientFactory";
import { IAuthClient } from "./auth.client.interface";
import FirebaseAuthClient from "./providers/FirebaseAuthClient";

export default class AuthClientFactory extends APIClientFactory<IAuthClient,AuthProvider>{
    protected createClient(provider: AuthProvider): IAuthClient {
        switch(provider){
            case AuthProvider.FIREBASE:
            default:
                return new FirebaseAuthClient();
        }
    }


}