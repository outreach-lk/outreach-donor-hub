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
    Textarea,
  } from "@chakra-ui/react";
import { useState } from "react";
import { useEntity } from "../../../../hooks/entity";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { ExpenseDto } from "../../../../types/dtos/expense.dtos";
  import { MilestoneDto } from "../../../../types/dtos/milestone.dtos";
  
  export interface ModalProps {
    causeId: string  
    init?: MilestoneDto;
    isOpen: boolean;
    onClose: () => void;
    forceRefresh: ()=>void;
  }
  /** 
   * @param props 
   * @returns 
   */
  export function NewExpenseForm(props: ModalProps) {
      const {createEntity} = useEntity('expense');
      const [note,setNote] = useState('');
      const [amount, setAmount] = useState(0);
      const [link,setLink] = useState('');
      const [isSubmitting,setIsSubmitting] = useState(false);
      const {show} = useFeedback();
      
      const onSubmit = () => {
        if(props.init){
            // is editing.
      }else{
            setIsSubmitting(true);
            createEntity<ExpenseDto>({
                causeId: props.causeId,
                note,
                amount,
                link
            })
            .then(()=>{
              props.forceRefresh();
              props.onClose();
              show("New Expense Claim Created",{
                type: 'success',
                title: "New Expense Claim"
              })
            })
            .catch(error=>{
              show("Error Creating Expense Claim",{
                type: 'success',
                title: "New Expense Claim Error"
              })
            })
            .finally(()=>{
              setIsSubmitting(false);
            })
        }
      }
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
                    <Input id="amount" type="number" onChange={(e)=>{setAmount(parseFloat(e.target.value))}} value={amount}/>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor="note">Particulars</FormLabel>
                    <Textarea id="note" onChange={(e)=>{setNote(e.target.value)}} value={note}/>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="amount">Download Link to Recipts &amp; Invoices  </FormLabel>
                    <Input id="amount" type="url"  onChange={(e)=>{setLink(e.target.value)}} value={link}/>
                </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
              <Button onClick={onSubmit} colorScheme={"blue"} isLoading={isSubmitting}>Add Expense</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  