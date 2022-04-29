import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { createRef, RefObject, useRef, useState } from "react";
import { RichTextEditor, SerializableBlock } from "../../app/ui/components/elements/wyswyg-editor";
import { EditorBlock } from "../../app/ui/components/elements/wyswyg-editor/editor-block";
import { EditorTree } from "../../app/ui/components/elements/wyswyg-editor/tree";
import { Footer } from "../../app/ui/components/modules/Footer";
import { Nav } from "../../app/ui/components/modules/Navigation";
import newCauseEditor from "../../app/ui/components/modules/cause/new/editor.blocks.json";
export default function NewCausePage() {
  let editorRef = useRef<EditorTree | null>(null);


  return (
    <>
      <Nav />
      <Container maxW={"full"} py="12" >
        <Box minH={"xl"}>
         <Stack>
          <Heading size={"md"}>Create a new Cause</Heading>
          <Heading size={"sm"}>And let the donors know!</Heading>
         </Stack>
          <Box p="12">
          <RichTextEditor 
            debug={true}
            blocklist={newCauseEditor.blocks as SerializableBlock[]}
            treeGrabber={(tree:EditorTree)=>{
                editorRef.current = tree;
            }}
          />
          </Box>
            <Stack>
                <Button
                    onClick={()=>{
                        console.log(editorRef.current?.serializeTree.bind(editorRef.current)());
                    }}
                    colorScheme="blue"
                
                >Create Cause</Button>
            </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
