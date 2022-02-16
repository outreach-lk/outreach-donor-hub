import AuthClientFactory from "./auth/client/auth.client.factory";
import AuthServiceFactory from "./auth/service/auth.service.factory";
import StorageClientFactory from "./storage/client/StorageClientFactory";

/** API Client creators */
export const authClientFactory = new AuthClientFactory();
export const storageClientFactory = new StorageClientFactory();



