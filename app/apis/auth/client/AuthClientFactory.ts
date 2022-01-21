import { AuthProvider } from "../../../types/enums/providers";
import BaseClientFactory from "../../BaseClientFactory";
import { IAuthClient } from "../../../types/interfaces/auth.client.interface";
import FirebaseAuthClient from "./providers/FirebaseAuthClient";

export default class AuthClientFactory extends BaseClientFactory<IAuthClient,AuthProvider>{
    protected createClient(provider: AuthProvider): IAuthClient {
        switch(provider){
            case AuthProvider.FIREBASE:
            default:
                return new FirebaseAuthClient();
        }
    }


}