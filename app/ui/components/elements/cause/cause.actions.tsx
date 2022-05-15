import {
  Button,
  Box,
  Wrap,
  useDisclosure,
  Heading,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { getConfig } from "../../../../config";
import Cause from "../../../../data/entities/cause.entity";
import { useEntity } from "../../../../hooks/entity";
import { getCauseShareUrl } from "../../../../utils/get-share-url";
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
              <Heading size={"sm"}>Edit Campaign</Heading>
              <Button colorScheme={"blue"} onClick={onExpenseOpen}>
                Add Campaign Expense
              </Button>
              <Button colorScheme={"blue"} onClick={onMilestoneOpen}>
                Add Campaign Milestone
              </Button>
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
    </Box>
  );
}
