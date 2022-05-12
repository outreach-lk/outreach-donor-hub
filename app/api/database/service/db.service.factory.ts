import { DatabaseProvider } from "../../../types/enums/providers";
import { IDatabaseService } from "../../../types/interfaces/db.service.interface";
import BaseServiceFactory from "../../base.service.factory";
import FirebaseDatabaseService from "./providers/firebase.db.service";


export class DatabaseServiceFactory extends BaseServiceFactory<IDatabaseService, DatabaseProvider>{
    protected createService(serverPrivateKey: string, provider?: DatabaseProvider): IDatabaseService {
        if(this.isNode){
            switch(provider){
                default:
                case DatabaseProvider.FIREBASE:
                    return new FirebaseDatabaseService(serverPrivateKey);
            }
        } else{
            return ({} as IDatabaseService);
        }
    }
}

export default new DatabaseServiceFactory();