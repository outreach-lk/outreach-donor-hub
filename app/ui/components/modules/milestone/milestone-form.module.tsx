import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MilestoneDto } from "../../../../types/dtos/milestone.dtos";
import { RichTextEditor, SerializableBlock } from "../wyswyg-editor";
import { EditorTree } from "../wyswyg-editor/tree";
import causeMilestoneTemplate from "../../../../config/editor-templates/cause-milestone.editor.template.json"
import { FaClock, FaRegClock } from "react-icons/fa";
import { useEntity } from "../../../../hooks/entity";
import { MilestoneStatus } from "../../../../types/enums/status";
import { FileStorageProvider } from "../../../../types/enums/providers";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";

interface MilestoneFormProps {
  causeId: string  
  init?: MilestoneDto;
  onSubmit: ()=>void
}
export interface ModalProps {
  causeId: string  
  init?: MilestoneDto;
  isOpen: boolean;
  onClose: () => void;
  forceRefresh: ()=>void;
}
export function MilestoneForm(props: MilestoneFormProps) {
  const editorRef = useRef<EditorTree | null>(null);
  const {createEntity} = useEntity('milestone')
  const handleMilestoneSubmit = (title: string, description: SerializableBlock[]) => {
      if(props.init){
          // is editing.
    }else{
            const _attachments = [
              ...description.map((block) => {
                if (block.media?.src) {
                  return {
                    provider: FileStorageProvider.FIRESTORAGE,
                    path: block.media?.src,
                  } as FileDto;
                }
              }),
            ];
          createEntity<MilestoneDto>({
              causeId: props.causeId,
              description,
              title,
          })
          .then(()=>{
            props.onSubmit();
          })
      }
  }

  return (
    <Box>
      <Container>
        <RichTextEditor
          blocklist={props.init?.description || causeMilestoneTemplate.blocks as SerializableBlock[]}
          treeGrabber={(tree: EditorTree) => {
            editorRef.current = tree;
          }}
        />
        <Button
            onClick={() => {
              const treeData = editorRef.current?.serializeTree.bind(editorRef.current)();
              if(treeData){
                const {rawValue: title} = treeData.blocks[0];
                const description = treeData.blocks.slice(1);
                handleMilestoneSubmit(title,description);   
              }
            }}
            colorScheme="blue"
          >
            Add Milestone
          </Button>
      </Container>
    </Box>
  );
}
/** 
 * @param props 
 * @returns 
 */
export function MilestoneFormModal(props: ModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>⏳ Add Campaign Milestone </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MilestoneForm {...props} 
            onSubmit={()=>{
              props.forceRefresh();
              props.onClose();
            }}
          />
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
