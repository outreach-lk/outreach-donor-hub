/* eslint-disable @typescript-eslint/unbound-method */
import { FileStorageProvider } from "../../types/enums/providers";
import StorageClientFactory from "./StorageClientFactory";

describe("Create Storage Client", ()=>{
    const storageClientFactory:StorageClientFactory = new StorageClientFactory();
    // spies
    const spy = jest.spyOn(storageClientFactory,<keyof StorageClientFactory>'createClient');

    it("If the storage client has not been created, call create client", () => {
        storageClientFactory.getClient(FileStorageProvider.FIRESTORAGE);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("If the storage client has been created once, do not call create client again", ()=>{
        storageClientFactory.getClient(FileStorageProvider.FIRESTORAGE);
        expect(spy).toHaveBeenCalledTimes(1);
    });


})
