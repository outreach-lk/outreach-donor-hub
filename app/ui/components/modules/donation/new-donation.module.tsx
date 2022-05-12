import {
  Text,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Badge,
  List,
  ListItem,
  ListIcon,
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";
import { MdCheckCircle, MdLocalFireDepartment } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import Cause from "../../../../data/entities/cause.entity";
import { FaCircle } from "react-icons/fa";
import { DonationAccountDetails } from "../../elements/donation/donation-account-deets";
import { UniqueDonorId } from "../../elements/donation/unique-donor-id";

/**
 * Create new Donation Claim Module
 */
interface NewDonationClaimProps {
  cause: Cause;
  isOpen: boolean;
  onClose: () => void;
}
export default function NewDonationClaim(props: NewDonationClaimProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Donate to {props.cause.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List>
            <ListItem>
              <ListIcon as={FaCircle} color="green.500" />
              Thank you for your consideration to donate to this campaign.
            </ListItem>
            <ListItem>
              <ListIcon as={GoAlert} color="yellow.600" />
              Please note that <strong>Outreach DonorHub</strong> does not
              collect any of your funds.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCircle} color="green.500" />
              You can make your donations to the following Bank Account,
              provided by campaign owner. Use the following unique reference id
              as your Transaction Reference / Note.
              <Flex p="4" flexDirection={"row"} justify="space-between">
                <DonationAccountDetails cause={props.cause} />
                <UniqueDonorId causeId={props.cause.id as string} />
              </Flex>
            </ListItem>
            <ListItem>
              <ListIcon as={FaCircle} color="green.500" />
              Once the transfer is complete, click on{" "}
              <Badge colorScheme="blue">I've Donated</Badge> button and post a
              screenshot / receipt as proof of transaction.
            </ListItem>
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            I've Donated
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
