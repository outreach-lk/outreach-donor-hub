import { FileMetadata, RemoteFileUploadResDto, FileDto, RemoteFileDeleteResDto } from "../../../../types/dtos/remote-file.dtos";
import { IFileStorageClient } from "../../../../types/interfaces/storage.client.interface";

/** Storage Client for Provider Google Firestroage */
export default class FireStorageClient implements IFileStorageClient {
    uploadFile(file: File, meta: FileMetadata): Promise<RemoteFileUploadResDto> {
        throw new Error("Method not implemented.");
    }
    updateFile(path: string, meta: FileMetadata): Promise<RemoteFileUploadResDto> {
        throw new Error("Method not implemented.");
    }
    fetchFile(path: string): Promise<FileDto> {
        throw new Error("Method not implemented.");
    }
    removeFile(path: string): Promise<RemoteFileDeleteResDto> {
        throw new Error("Method not implemented.");
    }
    
}