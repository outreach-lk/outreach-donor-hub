import { FileStorageProvider } from "../../types/enums/providers";
import APIClientFactory from "../APIClientFactory";
import FireStorageClient from "./providers/FireStorageClient";
import { IFileStorageClient } from "../../types/interfaces/storage.client.interface";

export class StorageClientFactory extends APIClientFactory<IFileStorageClient,FileStorageProvider> {
    protected createClient(provider: FileStorageProvider): IFileStorageClient {
        switch(provider){
            default:
            case FileStorageProvider.FIRESTORAGE:
                return new FireStorageClient();

        }
    }

}