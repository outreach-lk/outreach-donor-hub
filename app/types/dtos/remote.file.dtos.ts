/**
 * Defines dtos for remote file access.
 */

import { Auditable } from "../auditable";
import { FileStorageProvider } from "../enums/providers";
import { ServerError, ServerMessageDto } from "./server.message.dtos";

/**
 * Representation of any file stored remotely.
 */
export type FileDto = {
    provider: FileStorageProvider,
    path: string,
    metadata: FileMetadata | AuditableFileMetadata
}

/**
 * Metadata to be associated with a file.
 * TODO: Does this belong here in this file?
 */
 export type FileMetadata = {
    size: number,
    type: string,
}

/**
 * Response to file Upload Request
 */
export type RemoteFileUploadResDto = ServerMessageDto<FileDto|ServerError>;

/**
 * Response to file deletion Request
 */
export type RemoteFileDeleteResDto = ServerMessageDto<FileDto|ServerError>;

/** Auditable forms of all dtos exported here */
export type AuditableFileMetadata = FileMetadata & Auditable;
