import { Badge, Button, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import { storageClientFactory } from "../../../../api/clients";
import { FileDto, RemoteFileUploadResDto } from "../../../../types/dtos/remote-file.dtos";
import { FileStorageProvider } from "../../../../types/enums/providers";
import { isFileValidImage } from "../../../../utils/file-type-validation";
import FilePicker from "./picker";

interface FileUploaderProps {
    callback: (file: FileDto | File) => void,
    preventUpload?: boolean
}

export function FileUploader(props: FileUploaderProps){
    const [pickerFile, setPickerFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [invalidFile, setInvalidFile] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const client = storageClientFactory.getClient(FileStorageProvider.FIRESTORAGE);
    //method bindings
    //TODO: use a custom hook instead
    const uploadFile = client.uploadFile.bind(client);
    const fetchFile = client.fetchFile.bind(client);
    const handleUpload = () => {
      if (pickerFile && !uploaded) {
        setIsUploading(true);
        setUploaded(false);
        uploadFile(pickerFile)
          .then(async (res) => {
            setIsUploading(false);
            setUploaded(true);
            props.callback({
              path: (await fetchFile((res.data as FileDto).path)).path,
              provider: FileStorageProvider.FIRESTORAGE,
              metadata: {
                  size: pickerFile.size,
                  type: pickerFile.type,
              }
            })
          })
          .catch((error) => {
            setIsUploading(false);
            setUploaded(false);
            setUploadError(error);
          });
      }
    }
    return (
        <Wrap direction={"column"} spacing="4">
        <FilePicker
          onFileLoad={(file) => {
              // Allow room for other file types

              if (isFileValidImage(file)) {
                setPickerFile(file);
                setInvalidFile(false);
                if(props.preventUpload){
                  props.callback(file)
                }
              } else {
                setInvalidFile(true);
              }
          }}
        />
       {!props.preventUpload&&<Wrap>
          <Button
            disabled={!!!pickerFile || uploaded}
            isLoading={isUploading}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Wrap>}
        {isUploading && (
          <Badge colorScheme={"green"}>Uploading...</Badge>
        )}
        {invalidFile && (
          <Badge colorScheme={"red"}>Unsupported File or Too Large</Badge>
        )}
        {uploadError && (
          <Badge colorScheme={"red"}>Unable to Upload File</Badge>
        )}
      </Wrap>
    )
}