/** 
 * Parent Class for Cross Environment Data Items 
*/

import { databaseClientFactory } from "../../adapters/clients";
import { DatabaseProvider } from "../../types/enums/providers";
import { IDatabaseClient } from "../../types/interfaces/db.client.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import MultiEnv from "../multi.env";

/**
 * parent class for the multi-env data access repository.
 */
export default class BaseRepo extends MultiEnv {

  protected db: IDatabaseClient | IDatabaseService = {} as IDatabaseClient;

  constructor(provider: DatabaseProvider) {
    super();
    if(this.isBrowser){
      this.db = databaseClientFactory.getClient(provider);
    } else {
       const databaseServiceFactory = require('../../adapters/services');
       this.db = databaseServiceFactory.getService(provider); 
    }
  }

}