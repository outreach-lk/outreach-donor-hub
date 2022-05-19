import { Image, ImageProps, Modal, ModalProps } from "@chakra-ui/react";
import { useState } from "react";
import { storageClientFactory } from "../../../../api/clients";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { FileStorageProvider } from "../../../../types/enums/providers";
import { IFileStorageClient } from "../../../../types/interfaces/storage.client.interface";
import { FullScreenLoader } from "../loader";

interface RemoteImageProps extends ImageProps {
    file: FileDto,
}
export function RemoteImage(props: RemoteImageProps){
    let client = storageClientFactory.getClient(props.file.provider);;
    const [src,setSrc] = useState('');

    client.fetchFile(props.file.path)
    .then(file=>{
        setSrc(file.path)
        //TOOD: Cache the image data locally
    })
    .catch(e=>{
        // DO somthing.
    })
    return (
        <>
       {src?<Image 
            src={src}
            {...props}
            />:
            <FullScreenLoader/>   
        }
            </>
    )
}