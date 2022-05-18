import {
  FileMetadata,
  RemoteFileUploadResDto,
  FileDto,
  RemoteFileDeleteResDto,
} from "../../../../types/dtos/remote-file.dtos";
import { IFileStorageClient } from "../../../../types/interfaces/storage.client.interface";
import {
  getStorage,
  FirebaseStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../../libs/firebase.client.sdk";
import { generateUniqueFileId } from "../../../../utils/generate-ids";
import {
  AuthProvider,
  FileStorageProvider,
} from "../../../../types/enums/providers";
import { IAuthClient } from "../../../../types/interfaces/auth.client.interface";
import { authClientFactory } from "../../../clients";

/** Storage Client for Provider Google Firestroage */
export default class FireStorageClient implements IFileStorageClient {
  private storage: FirebaseStorage;
  private auth: IAuthClient;
  constructor() {
    this.storage = getStorage(app);
    this.auth = authClientFactory.getClient(AuthProvider.FIREBASE);
  }
  uploadFile(file: File, meta: FileMetadata): Promise<RemoteFileUploadResDto> {
    const storageRef = ref(
      this.storage,
      "uploads/" + generateUniqueFileId(file.name) + "-" + file.name
    );
    return uploadBytes(storageRef, file)
      .then(async (res) => {
        return {
          data: {
            metadata: meta,
            path: res.ref.fullPath,
          },
        } as RemoteFileUploadResDto;
      })
      .catch((error) => {
        console.log(error);
        throw new Error("File Upload Error");
      });
  }
  updateFile(
    path: string,
    meta: FileMetadata
  ): Promise<RemoteFileUploadResDto> {
    throw new Error("Method not implemented.");
  }
  fetchFile(path: string): Promise<FileDto> {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef).then((path) => {
      return {
        path,
        metadata: {},
        provider: FileStorageProvider.FIRESTORAGE,
      } as FileDto;
    });
  }
  removeFile(path: string): Promise<RemoteFileDeleteResDto> {
    throw new Error("Method not implemented.");
  }
}
