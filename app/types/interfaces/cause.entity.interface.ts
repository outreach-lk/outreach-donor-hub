import { Auditable } from "../auditable";
import { AuditableFileMetadata, FileDto } from "../dtos/remote.file.dtos";

export interface ICauseActions {
    $browser_UploadCauseAttachments(files: FileDto[]):Promise<[Auditable & FileDto]>;
}