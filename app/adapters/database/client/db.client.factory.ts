import { DatabaseProvider } from "../../../types/enums/providers";
import { IDatabaseClient } from "../../../types/interfaces/db.client.interface";
import BaseClientFactory from "../../base.client.factory";
import FirebaseDatabseClient from "./providers/firebase.db.client";

export class DatabaseClientFactory<E,D> extends BaseClientFactory<IDatabaseClient,DatabaseProvider>{
    protected createClient(provider?: any): IDatabaseClient {
        switch (provider){
            default:
            case DatabaseProvider.FIREBASE:
                return new FirebaseDatabseClient();
        }
    }

}