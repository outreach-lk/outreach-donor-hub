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
} from "../../app/ui/components/modules/wyswyg-editor";
import { EditorBlock } from "../../app/ui/components/modules/wyswyg-editor/editor-block";
import { EditorTree } from "../../app/ui/components/modules/wyswyg-editor/tree";
import { Footer } from "../../app/ui/components/modules/Footer";
import { Nav } from "../../app/ui/components/modules/Navigation";
import newCauseEditor from "../../app/config/editor-templates/new-cause.editor.template.json";
import { useEntity } from "../../app/hooks/entity";
import Cause from "../../app/data/entities/cause.entity";
import { FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
export default function NewCausePage() {
  let editorRef = useRef<EditorTree | null>(null);
  const { createEntity } = useEntity("cause");
  const dto: CauseDto = {} as CauseDto;

  return (
    <>
      <Nav />
      <Container maxW={"full"} py="12">
        <Box minH={"xl"}>
          <Stack>
            <HStack>
            <Heading size={"md"}>Create a new Donation Campaign</Heading>
            <IconButton 
                aria-label="create-cause-info"
                icon={
                    <FaQuestionCircle/>
                }
            />
            </HStack>

            <Heading size={"sm"}>And let the donors know!</Heading>
          </Stack>
          <Box p="12">
            {/* Step 1: Cause Title, Description & Attachments */}
            <RichTextEditor
              blocklist={newCauseEditor.blocks as SerializableBlock[]}
              treeGrabber={(tree: EditorTree) => {
                editorRef.current = tree;
              }}
            />
          </Box>
          <Stack>
            <Button
              onClick={() => {
                console.log(
                  editorRef.current?.serializeTree.bind(editorRef.current)()
                );
              }}
              colorScheme="blue"
            >
              Continue
            </Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
