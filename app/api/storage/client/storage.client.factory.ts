import { FileStorageProvider } from "../../../types/enums/providers";
import BaseClientFactory from "../../base.client.factory";
import FireStorageClient from "./providers/firebase.storage.client";
import { IFileStorageClient } from "../../../types/interfaces/storage.client.interface";

export default class StorageClientFactory extends BaseClientFactory<IFileStorageClient,FileStorageProvider> {
    protected createClient(provider: FileStorageProvider): IFileStorageClient {
        switch(provider){
            default:
            case FileStorageProvider.FIRESTORAGE:
                return new FireStorageClient();

        }
    }

}