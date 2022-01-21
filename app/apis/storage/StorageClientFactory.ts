import { FileStorageProvider } from "../../types/enums/providers";
import BaseClientFactory from "../BaseClientFactory";
import FireStorageClient from "./client/providers/FireStorageClient";
import { IFileStorageClient } from "../../types/interfaces/storage.client.interface";

export default class StorageClientFactory extends BaseClientFactory<IFileStorageClient,FileStorageProvider> {
    protected createClient(provider: FileStorageProvider): IFileStorageClient {
        switch(provider){
            default:
            case FileStorageProvider.FIRESTORAGE:
                return new FireStorageClient();

        }
    }

}