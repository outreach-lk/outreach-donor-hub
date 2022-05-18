/**
 * Defines types and interface(s) relevant to client side file storage function.
 */

import {
  FileDto,
  FileMetadata,
  RemoteFileDeleteResDto,
  RemoteFileUploadResDto,
} from "../dtos/remote-file.dtos";

/**
 * All file storage provider clients must implement this interface
 */
export interface IFileStorageClient {
  uploadFile(file: File, meta?: FileMetadata): Promise<RemoteFileUploadResDto>;
  updateFile(path: string, meta: FileMetadata): Promise<RemoteFileUploadResDto>;
  fetchFile(path: string): Promise<FileDto>;
  removeFile(path: string): Promise<RemoteFileDeleteResDto>;
}
