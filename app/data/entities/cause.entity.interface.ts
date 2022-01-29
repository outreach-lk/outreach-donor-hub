import { Auditable } from "../../types/auditable";
import { AuditableFileMetadata, FileDto } from "../../types/dtos/remote.file.dtos";

export interface ICauseActions {
    $browser_UploadCauseAttachments(files: FileDto[]):Promise<[Auditable & FileDto]>;
}