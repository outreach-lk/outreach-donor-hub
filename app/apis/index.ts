import AuthClientFactory from "./auth/client/AuthClientFactory";
import StorageClientFactory from "./storage/client/StorageClientFactory";

/** API Client creators */
export const authClientFactory = new AuthClientFactory();
export const storageClientFactory = new StorageClientFactory();

