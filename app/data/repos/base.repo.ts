/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** 
 * Parent Class for Cross Environment Data Items 
*/

import databaseClientFactory  from "../../api/database/client/db.client.factory";
import databaseServiceFactory  from "../../api/database/service/db.service.factory";
import { DatabaseProvider } from "../../types/enums/providers";
import { IDatabaseClient } from "../../types/interfaces/db.client.interface";
import { IDatabaseService } from "../../types/interfaces/db.service.interface";
import BaseEntity from "../entities/base.entity";
import MultiEnv from "../multi.env";

/**
 * parent class for the multi-env data access repository.
 */
export default class BaseRepo extends MultiEnv {

  protected db: IDatabaseClient | IDatabaseService = {} as IDatabaseClient;
  protected cached?: BaseEntity<any,any>;

  constructor(provider: DatabaseProvider) {
    super();
    if(this.isBrowser){
      this.db = databaseClientFactory.getClient(provider);
    } else {
       this.db = databaseServiceFactory.getService(provider); 
    }
  }

}