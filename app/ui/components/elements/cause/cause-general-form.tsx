import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    IconButton,
    Stack,
    useBreakpointValue,
    useColorModeValue as mode,
  } from "@chakra-ui/react";
  import { createRef, RefObject, useRef, useState } from "react";
  import {
    RichTextEditor,
    SerializableBlock,
  } from "../../modules/wyswyg-editor";
  import { EditorBlock } from "../../modules/wyswyg-editor/editor-block";
  import { EditorTree } from "../../modules/wyswyg-editor/tree";
  import { Footer } from "../../modules/Footer";
  import { Nav } from "../../modules/Navigation";
  import newCauseEditor from "../../../../config/editor-templates/new-cause.editor.template.json";
  import { useEntity } from "../../../../hooks/entity";
  import Cause from "../../../../data/entities/cause.entity";
  import { FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
  import { CauseDto } from "../../../../types/dtos/cause.dtos";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
  interface CauseGeneralFormProps {
    onContinue: (title:string, description: SerializableBlock[], attachments: FileDto[])=> void;
    blockList: SerializableBlock[] | null
  }
export function CauseGeneralForm(props:CauseGeneralFormProps){
    const editorRef = useRef<EditorTree | null>(null);

    return (
        <Box minH={"xl"}>
        <Box >
          {/* Step 1: Cause Title, Description & Attachments */}
          <RichTextEditor
            blocklist={props.blockList || newCauseEditor.blocks as SerializableBlock[]}
            treeGrabber={(tree: EditorTree) => {
              editorRef.current = tree;
            }}
          />
        </Box>
        <Stack >
          <Button
            onClick={() => {
              const treeData = editorRef.current?.serializeTree.bind(editorRef.current)();
              if(treeData){
                const {rawValue: title} = treeData.blocks[0];
                const description = treeData.blocks.slice(1);
                props.onContinue(title,description,[]);
              }
            }}
            colorScheme="blue"
          >
            Save
          </Button>
        </Stack>
      </Box>
    )
}