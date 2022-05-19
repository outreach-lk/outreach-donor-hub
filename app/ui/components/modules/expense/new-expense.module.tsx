import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
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
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { storageClientFactory } from "../../../../api/clients";
import { useEntity } from "../../../../hooks/entity";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { ExpenseDto } from "../../../../types/dtos/expense.dtos";
import { MilestoneDto } from "../../../../types/dtos/milestone.dtos";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { FileStorageProvider } from "../../../../types/enums/providers";
import { FileUploader } from "../uploader";

export interface ModalProps {
  causeId: string;
  init?: MilestoneDto;
  isOpen: boolean;
  onClose: () => void;
  forceRefresh: () => void;
}
/**
 * @param props
 * @returns
 */
export function NewExpenseForm(props: ModalProps) {
  const { createEntity } = useEntity("expense");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(0);
  const [proof, setProof] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show } = useFeedback();
    //FIXME: get these into a custom hook
    const client = storageClientFactory.getClient(FileStorageProvider.FIRESTORAGE);
    //method bindings
    //TODO: use a custom hook instead
    const uploadFile = client.uploadFile.bind(client);
    const fetchFile = client.fetchFile.bind(client);

  const onSubmit = async () => {
    if (props.init) {
      // is editing.
    } else {
      setIsSubmitting(true);
      const data: ExpenseDto = {
        causeId: props.causeId,
        note,
        amount,
      }
      if(proof){
        const uploadRes =  await uploadFile(proof);
        data.evidence = uploadRes.data as FileDto
      }
      
      createEntity<ExpenseDto>(data)
        .then(() => {
          props.forceRefresh();
          props.onClose();
          show("New Expense Claim Created", {
            type: "success",
            title: "New Expense Claim",
          });
        })
        .catch((error) => {
          show("Error Creating Expense Claim", {
            type: "success",
            title: "New Expense Claim Error",
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Campaign Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl isRequired>
              <FormLabel htmlFor="amount">Amount</FormLabel>
              <Input
                id="amount"
                type="number"
                onChange={(e) => {
                  setAmount(parseFloat(e.target.value));
                }}
                value={amount}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="note">Particulars</FormLabel>
              <Textarea
                id="note"
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                value={note}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Proof of Expense</FormLabel>
              <FileUploader
                preventUpload={true}
                callback={(file) => setProof(file as File)}
              />
              <FormHelperText>eg: screen shot of invoice</FormHelperText>
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onSubmit}
            colorScheme={"blue"}
            isLoading={isSubmitting}
            disabled={!proof}
          >
            Add Expense
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
