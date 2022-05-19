import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  useBreakpoint,
  Stack,
  Box,
  Wrap,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { RefObject, useEffect, useState } from "react";
import {
  FaCameraRetro,
  FaLink,
  FaPlusCircle,
  FaTrash,
  FaDotCircle,
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
} from "react-icons/fa";
import { BlockAlignment, BlockType } from ".";
import { storageClientFactory } from "../../../../api/clients";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { FileStorageProvider } from "../../../../types/enums/providers";
import { isFileValidImage } from "../../../../utils/file-type-validation";
import FilePicker from "../file-picker";
import { EditorBlock } from "./editor-block";

interface BlockTypeSelProps {
  isOpen: boolean;
  addCallback: (tag: BlockType, data?: any) => void;
  removeCallback: (block: EditorBlock) => void;
  alignmentCallback: (block: EditorBlock, alignment: BlockAlignment) => void;
  menuRef: RefObject<HTMLDivElement>;
  currentBlock?: EditorBlock;
}
/**
 * FIXME: Decompose into granular components.
 * @param props
 * @returns
 */
export function BlockTypeSel(props: BlockTypeSelProps) {
  const client = storageClientFactory.getClient(
    FileStorageProvider.FIRESTORAGE
  );
  const uploadFile = client.uploadFile.bind(client);
  const fetchFile = client.fetchFile.bind(client);


  if (props.currentBlock?.hideMenu) return null;
  const [picker, showPicker] = useState(false);
  const [pickerFile, setPickerFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [invalidFile, setInvalidFile] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setPickerFile(null);
    setIsUploading(false);
    setInvalidFile(false);
    setUploadError(null);
  }, [picker]);
  return (
    <Box ref={props.menuRef} className="editor-popover">
      <Stack className="editor-popover-toolbar">
        {picker ? (
          // Should go in its own component
          <Wrap direction={"column"} spacing="4">
            <FilePicker
              onFileLoad={(file) => {
                if (isFileValidImage(file)) {
                  setPickerFile(file);
                  setInvalidFile(false);
                } else {
                  setInvalidFile(true);
                }
              }}
            />
            <Wrap>
              <Button onClick={() => showPicker(false)}>Close</Button>
              <Button
                disabled={!!!pickerFile || uploaded}
                isLoading={isUploading}
                onClick={() => {
                  if (pickerFile && !uploaded) {
                    setIsUploading(true);
                    uploadFile(pickerFile)
                      .then(async (res) => {
                        setIsUploading(false);
                        setUploaded(true);

                        props.addCallback(
                          BlockType.img,
                          (await fetchFile((res.data as FileDto).path)).path
                        );
                      })
                      .catch((error) => {
                        setIsUploading(false);
                        setUploaded(false);
                        setUploadError(error);
                      });
                  }
                }}
              >
                Upload
              </Button>
            </Wrap>
            {invalidFile && (
              <Badge colorScheme={"red"}>Unsupported File or Too Large</Badge>
            )}
            {uploadError && (
              <Badge colorScheme={"red"}>Unable to Upload File</Badge>
            )}
          </Wrap>
        ) : (
          <>
            <Stack direction={"row"} align="center" justify={"center"}>
              <FaPlusCircle />
              <Button onClick={() => props.addCallback(BlockType.p)}>p</Button>
              <Button onClick={() => props.addCallback(BlockType.h1)}>
                h1
              </Button>
              <Button onClick={() => props.addCallback(BlockType.h2)}>
                h2
              </Button>
              <Button onClick={() => props.addCallback(BlockType.h3)}>
                h3
              </Button>
              <IconButton
                onClick={() => props.addCallback(BlockType.a)}
                aria-label="Add Link"
                icon={<FaLink />}
              />
              <IconButton
                onClick={() => showPicker(true)}
                aria-label="Add Image"
                icon={<FaCameraRetro />}
              />
            </Stack>
            {props.currentBlock && (
              <Stack direction={"row"}>
                <FaDotCircle />
                <IconButton
                  icon={<FaAlignLeft />}
                  aria-label="align-left"
                  onClick={() =>
                    props.alignmentCallback(
                      props.currentBlock as EditorBlock,
                      BlockAlignment.left
                    )
                  }
                />
                <IconButton
                  icon={<FaAlignCenter />}
                  aria-label="align-center"
                  onClick={() =>
                    props.alignmentCallback(
                      props.currentBlock as EditorBlock,
                      BlockAlignment.center
                    )
                  }
                />
                <IconButton
                  icon={<FaAlignRight />}
                  aria-label="align-right"
                  onClick={() =>
                    props.alignmentCallback(
                      props.currentBlock as EditorBlock,
                      BlockAlignment.right
                    )
                  }
                />
                {!props.currentBlock.preventDeletion && (
                  <IconButton
                    onClick={() => {
                      props.removeCallback(props.currentBlock as EditorBlock);
                    }}
                    colorScheme="red"
                    aria-label="Remove"
                    icon={<FaTrash />}
                  />
                )}
              </Stack>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
}
