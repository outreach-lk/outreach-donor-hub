import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaImage, FaLink } from "react-icons/fa";
import Cause from "../../../../data/entities/cause.entity";
import Donation from "../../../../data/entities/donation.entity";
import { useAuth } from "../../../../hooks/auth.hooks";
import { useEntity } from "../../../../hooks/entity";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { DonationDto } from "../../../../types/dtos/donation.dtos";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { DonationStatus } from "../../../../types/enums/status";
import { getDateFromFirebaseDateTimeObject } from "../../../../utils/date-time";
import { RemoteImage } from "../remote-image";

export function DonationCard(props: {data:DonationDto,canReview?:boolean,isOwner?:boolean}) {
  const data = new Donation(props.data);
  const [isDisputed,setIsDisputed] = useState(data.status === DonationStatus.DISPUTED);
  const [isPending,setIsPending] = useState(data.status === DonationStatus.CLAIMED || data.status === undefined);
  const [isConfirmed,setIsConfirmed] = useState( data.status === DonationStatus.ACKNOWLEDGED);
  const {isOpen:isProofOpen, onClose:onProofClose, onOpen:onProofOpen} = useDisclosure();
  const { show } = useFeedback();

  const handleDonationStatusChange = (
    status: DonationStatus,
    donation: Donation
  ) => {
    let task: Promise<any>;
    if (status === DonationStatus.ACKNOWLEDGED) {
      task = donation.confirmDonationClaim();
    } else {
      task = donation.disputeDonationClaim();
    }
    task
      .then(() => {
        setIsPending(false);
        setIsConfirmed(status === DonationStatus.ACKNOWLEDGED);
        setIsDisputed(status === DonationStatus.DISPUTED);
        show("Donation Claim Acknowledged.", {
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
      {props.isOwner && (
        <Badge colorScheme={"blue"}>Your Donation</Badge>
      )}
      {isDisputed && <Badge colorScheme={"red"}>Disputed</Badge>}
      {isPending && <Badge colorScheme={"yellow"}>Pending Confirmation</Badge>}
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
        </Box>
        <Box>
          Donor Ref:
          <Heading>{data.ref}</Heading>
          <Wrap>
            <Tooltip label={data.id}>
              <Flex
                align={"baseline"}
                cursor="pointer"
                textDecoration={"underline"}
              >
                <HStack>
                  <FaLink />
                  <small>Unique Donation Id</small>
                </HStack>
              </Flex>
            </Tooltip>
            {data.evidence?.at(0)?.attachments &&
            <Tooltip label={"Proof of Transfer"} >
              <Flex
                align={"baseline"}
                cursor="pointer"
                textDecoration={"underline"}
              >
                <HStack>
                  <FaImage />
                  <Button fontSize={"sm"} onClick={onProofOpen} variant={"link"}>View Proof</Button>
                </HStack>
              </Flex>
            </Tooltip>}
          </Wrap>
          {data.status === DonationStatus.CLAIMED && props.canReview && isPending && (
            <Wrap py="2">
              <Button
                colorScheme={"blue"}
                onClick={() =>
                  handleDonationStatusChange(DonationStatus.ACKNOWLEDGED, data)
                }
              >
                Confirm Claim
              </Button>
              <Button
                colorScheme={"red"}
                onClick={() =>
                  handleDonationStatusChange(DonationStatus.DISPUTED, data)
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
        <ModalCloseButton/>
        <ModalHeader>Proof of Transaction</ModalHeader>
        <ModalBody>
              <RemoteImage 
                    file={data.evidence?.at(0)?.attachments as FileDto}
                />
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
}
