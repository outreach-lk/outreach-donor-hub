import { AuthProvider } from "../../../types/enums/providers";
import { IAuthService } from "../../../types/interfaces/auth.service.interface";
import BaseServiceFactory from "../../base.service.factory";
import FirebaseAuthService from "./providers/firebase.auth.service";
import MockAuthService from "./providers/mock.auth.service";

export default class AuthServiceFactory extends BaseServiceFactory<IAuthService, AuthProvider>{
    protected createService(serverPrivateKey:string, provider?: AuthProvider): IAuthService {
        if(this.isNode){
            switch(provider){
                case AuthProvider.MOCK:
                default:
                    return new MockAuthService(serverPrivateKey);
                case AuthProvider.FIREBASE:
                    return new FirebaseAuthService(serverPrivateKey);
            }
        } else {
            return ({} as IAuthService);
        }
    }

}