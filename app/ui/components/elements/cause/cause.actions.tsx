import {
  Button,
  Box,
  Wrap,
  useDisclosure,
  Heading,
  Spacer,
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { GoMilestone } from "react-icons/go";
import { getConfig } from "../../../../config";
import Cause from "../../../../data/entities/cause.entity";
import { useEntity } from "../../../../hooks/entity";
import { getCauseShareUrl } from "../../../../utils/get-share-url";
import { CauseEditModule } from "../../modules/cause/cause-edit.module";
import NewDonationClaimContainer from "../../modules/donation/pre-donation.module";
import { NewExpenseForm } from "../../modules/expense/new-expense.module";
import { MilestoneFormModal } from "../../modules/milestone/milestone-form.module";
import { ShareButtons } from "../sm-share/share-buttons";

interface CauseActionProps {
  cause: Cause;
  forceRefresh: () => void;
}

export function CauseActions(props: CauseActionProps) {
  const { checkEntityPerms } = useEntity("cause");
  const { canUpdate } = checkEntityPerms(props.cause);
  const {
    isOpen: isDonationOpen,
    onOpen: onDonationOpen,
    onClose: onDonationClose,
  } = useDisclosure();
  const {
    isOpen: isMilestonrOpen,
    onOpen: onMilestoneOpen,
    onClose: onMilestoneClose,
  } = useDisclosure();
  const {
    isOpen: isExpenseOpen,
    onOpen: onExpenseOpen,
    onClose: onExpenseClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const onEditCampaignClick = () => {
    onEditOpen();
  }

  const { appUrl } = getConfig();
  return (
    <Box>
      <Wrap>
        {!canUpdate && (
          <Button colorScheme={"blue"} onClick={onDonationOpen}>
            Donate
          </Button>
        )}
        {!canUpdate && <Button colorScheme={"red"}>Report</Button>}
        <Wrap direction={"column"}>
          <Heading size={"sm"}>Share</Heading>
          <ShareButtons
            url={getCauseShareUrl(props.cause)}
            title={props.cause.title}
            desc={props.cause.description[0].rawValue + props.cause.description[1].rawValue} //FIXME: Sanitize
          />
          <Heading size={"sm"}>Campaign Claims</Heading>
          <Link
            href={{
              pathname: "/cause/[id]/donations",
              query: {
                id: props.cause.id?.slice(6),
              },
            }}
          >
            <Button cursor={"pointer"} as="a" colorScheme={"blue"}>
              View Donations
            </Button>
          </Link>
          <Link
            href={{
              pathname: "/cause/[id]/expenses",
              query: {
                id: props.cause.id?.slice(6),
              },
            }}
          >
            <Button cursor={"pointer"} as="a" colorScheme={"blue"}>
              View Expenses
            </Button>
          </Link>
          {canUpdate && (
            <>
              <Heading size={"sm"}>Manage Campaign</Heading>
              <Button colorScheme={"blue"} onClick={onExpenseOpen}>
                Add Campaign Expense
              </Button>
              <Button colorScheme={"blue"} onClick={onMilestoneOpen}
                leftIcon={<GoMilestone/>}
              >
                Add Campaign Milestone
              </Button>
              {!props.cause.isVerified&&
              <Button colorScheme={"blue"} onClick={onEditCampaignClick}
                leftIcon={<FaEdit/>}
              >
                Edit Campaign Details
              </Button>}
            </>
          )}
        </Wrap>
      </Wrap>
      <NewDonationClaimContainer
        cause={props.cause}
        isOpen={isDonationOpen}
        onClose={onDonationClose}
        forceRefresh={props.forceRefresh}
      />
      <MilestoneFormModal
        causeId={props.cause.id as string}
        isOpen={isMilestonrOpen}
        onClose={onMilestoneClose}
        forceRefresh={props.forceRefresh}
      />
      <NewExpenseForm
        causeId={props.cause.id as string}
        isOpen={isExpenseOpen}
        onClose={onExpenseClose}
        forceRefresh={props.forceRefresh}
      />
      {/* Edit Campaign Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="full" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader>Edit Campaign</ModalHeader>
          <ModalCloseButton/>
          <ModalBody>
            <CauseEditModule cause={props.cause} callback={onEditClose}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
