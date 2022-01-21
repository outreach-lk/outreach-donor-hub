import AuthClientFactory from "./auth/AuthClientFactory";
import { StorageClientFactory } from "./storage/StorageClientFactory";

/** API Client creators */
export const authClientFactory = new AuthClientFactory();
export const storageClientFactory = new StorageClientFactory();

