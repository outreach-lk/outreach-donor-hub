import { AuthProvider } from "../../../types/enums/providers";
import { IAuthService } from "../../../types/interfaces/auth.service.interface";
import BaseServiceFactory from "../../base.service.factory";
import MockAuthService from "./providers/MockAuthService";

export default class AuthServiceFactory extends BaseServiceFactory<IAuthService, AuthProvider>{
    protected createService(serverPrivateKey:string, provider?: AuthProvider): IAuthService {
        switch(provider){
            case AuthProvider.MOCK:
            default:
                return new MockAuthService(serverPrivateKey);
        }
    }

}