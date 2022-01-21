import { FileStorageProvider } from "../../types/enums/providers";
import BaseClientFactory from "../BaseClientFactory";
import FireStorageClient from "./providers/FireStorageClient";
import { IFileStorageClient } from "../../types/interfaces/storage.client.interface";

export class StorageClientFactory extends BaseClientFactory<IFileStorageClient,FileStorageProvider> {
    protected createClient(provider: FileStorageProvider): IFileStorageClient {
        switch(provider){
            default:
            case FileStorageProvider.FIRESTORAGE:
                return new FireStorageClient();

        }
    }

}