import { DatabaseProvider } from "../../../types/enums/providers";
import { IDatabaseService } from "../../../types/interfaces/db.service.interface";
import BaseServiceFactory from "../../base.service.factory";

export default class DatabaseServiceFactory extends BaseServiceFactory<IDatabaseService, DatabaseProvider>{
    protected createService(serverPrivateKey: string, provider?: DatabaseProvider): IDatabaseService {
        if(this.isNode){
            const FirebaseDatabaseService =  require("./providers/firebase.db.service");
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