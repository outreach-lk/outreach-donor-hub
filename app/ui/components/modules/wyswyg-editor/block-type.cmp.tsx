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
  Heading,
  Kbd,
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
import { dragElement } from "../../../../utils/handle-elem-drag";
import { FileUploader } from "../uploader";
import FilePicker from "../uploader/picker";
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
  const [uploader, showUploader] = useState(false);

  useEffect(()=>{
    if(props.menuRef.current){
      dragElement(props.menuRef.current)
    }
  },[props.menuRef])

  return (
    <Box ref={props.menuRef} className="editor-popover">
      <Stack className="editor-popover-toolbar">
        {uploader ? (
          <Wrap>
            <Flex align={"baseline"} justify="space-between" w="100%">
            <Heading size={"sm"}>Upload Image</Heading>
            <Button onClick={()=>showUploader(false)}>X</Button>
            </Flex>
            <FileUploader 
              callback={(file)=>{
                props.addCallback(BlockType.img,(file as FileDto).path)
              }}
              />
            </Wrap>
        ) : (
          <>
            {props.currentBlock && (
              <Stack direction={"row"} align="center" >
                <FaDotCircle />
      <Kbd>{props.currentBlock?.type}</Kbd>
                {(props.currentBlock.type !== BlockType.img && props.currentBlock.type !== BlockType.a)&&
                <>
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
                </>
                }
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
                onClick={() => showUploader(true)}
                aria-label="Add Image"
                icon={<FaCameraRetro />}
              />
            </Stack>

          </>
        )}
      </Stack>
    </Box>
  );
}
