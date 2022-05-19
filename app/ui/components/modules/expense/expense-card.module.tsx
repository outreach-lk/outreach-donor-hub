import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  Wrap,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import Expense from "../../../../data/entities/expense.entity";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { ExpenseDto } from "../../../../types/dtos/expense.dtos";
import { ExpenseStatus } from "../../../../types/enums/status";
import { getDateFromFirebaseDateTimeObject } from "../../../../utils/date-time";
import { RemoteImage } from "../remote-image";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { useState } from "react";

interface ExpenseCardProps {
  data: ExpenseDto;
  canReview?: boolean;
  isOwner?: boolean;
}
export function ExpenseCard(props: ExpenseCardProps) {
  const data = new Expense(props.data);
  const [isDisputed, setIsDisputed] = useState(
    data.status === ExpenseStatus.DISPUTED
  );
  const [isPending, setIsPending] = useState(
    data.status === ExpenseStatus.CLAIMED || data.status === undefined
  );
  const [isConfirmed, setIsConfirmed] = useState(
    data.status === ExpenseStatus.ACKNOWLEDGED
  );
  const {
    isOpen: isProofOpen,
    onClose: onProofClose,
    onOpen: onProofOpen,
  } = useDisclosure();

  const { show } = useFeedback();

  const handleExpenseStatusChange = (
    status: ExpenseStatus,
    expense: Expense
  ) => {
    let task: Promise<any>;
    if (status === ExpenseStatus.ACKNOWLEDGED) {
      task = expense.confirmexpenseClaim();
    } else {
      task = expense.disputeexpenseClaim();
    }
    task
      .then(() => {
        setIsPending(false);  
        setIsConfirmed( status === ExpenseStatus.ACKNOWLEDGED );
        setIsDisputed( status === ExpenseStatus.DISPUTED );
        show("Expense Claim Acknowledged.", {
          type: "success",
        });
      })
      .catch(() => {
        show("Error updating claim status", {
          type: "error",
        });
      });
  };
  return (
    <>
      <Box
        mb="4"
        p="4"
        shadow={"md"}
        bg={useColorModeValue("white", "linkedin.900")}
      >
        {props.isOwner && <Badge colorScheme={"blue"}>Your Expense</Badge>}
        {isDisputed && <Badge colorScheme={"red"}>Disputed</Badge>}
        {isPending && (
          <Badge colorScheme={"yellow"}>Pending Confirmation</Badge>
        )}
        {isConfirmed && <Badge colorScheme={"green"}>Confirmed</Badge>}
        <Flex
          textDecoration={isDisputed ? "line-through" : ""}
          align={"baseline"}
          justify="space-between"
        >
          <Box>
            <Text>
              {getDateFromFirebaseDateTimeObject(
                (data as any).createdOn
              ).toLocaleDateString()}
            </Text>
            <Stat>
              <StatLabel>Amount</StatLabel>
              <StatNumber>{data.amount.toFixed(2)}</StatNumber>
            </Stat>
            <Wrap>
              {data.evidence && (
                <Tooltip label={"Proof of Expense"}>
                  <Flex
                    align={"baseline"}
                    cursor="pointer"
                    textDecoration={"underline"}
                  >
                    <HStack>
                      <FaImage />
                      <Button
                        fontSize={"sm"}
                        onClick={onProofOpen}
                        variant={"link"}
                      >
                        View Proof
                      </Button>
                    </HStack>
                  </Flex>
                </Tooltip>
              )}
            </Wrap>
          </Box>
          <Box>
            Particulars
            <Text>{data.note}</Text>
            {/* FIXME:  Remove Expense Creator Permission to Review in the Backend. */}
            {data.status === ExpenseStatus.CLAIMED &&
              props.canReview &&
              !props.isOwner && isPending && (
                <Wrap py="2">
                  <Button
                    colorScheme={"blue"}
                    onClick={() =>
                      handleExpenseStatusChange(
                        ExpenseStatus.ACKNOWLEDGED,
                        data
                      )
                    }
                  >
                    Confirm Claim
                  </Button>
                  <Button
                    colorScheme={"red"}
                    onClick={() =>
                      handleExpenseStatusChange(ExpenseStatus.DISPUTED, data)
                    }
                  >
                    Dispute Claim
                  </Button>
                </Wrap>
              )}
          </Box>
        </Flex>
      </Box>
      {/* Proof Modal */}
      <Modal onClose={onProofClose} isOpen={isProofOpen} size="2xl">
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Proof of Expense</ModalHeader>
          <ModalBody>
            <RemoteImage file={data.evidence as FileDto} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
