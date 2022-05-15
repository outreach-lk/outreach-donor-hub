import { Button, Box, Wrap, useDisclosure, Heading, Spacer, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Cause from "../../../../data/entities/cause.entity";
import { useEntity } from "../../../../hooks/entity";
import NewDonationClaimContainer from "../../modules/donation/pre-donation.module";
import { MilestoneFormModal } from "../../modules/milestone/milestone-form.module";

interface CauseActionProps {
  cause: Cause;
  forceRefresh: ()=>void;
}

export function CauseActions(props: CauseActionProps) {
  const {checkEntityPerms} = useEntity('cause');
  const {canUpdate} = checkEntityPerms(props.cause);
  const { isOpen: isDonationOpen, onOpen: onDonationOpen, onClose: onDonationClose } = useDisclosure();
  const { isOpen: isMilestonrOpen, onOpen: onMilestoneOpen, onClose: onMilestoneClose } = useDisclosure();

  return (
    <Box>
      <Wrap>
        {!canUpdate&&<Button colorScheme={"blue"} onClick={onDonationOpen}>Donate</Button>}
        <Button colorScheme={"linkedin"}>Share</Button>
        {!canUpdate&&<Button colorScheme={"red"}>Report</Button>}
        {canUpdate && 
        <Wrap direction={"column"}>
          <Heading size={"sm"}>Edit Campaign</Heading>
          <Link href={{
            pathname: '/cause/[id]/donations',
            query: {
              id: props.cause.id?.slice(6)
            }
          }}>
            <Button cursor={"pointer"} as="a" colorScheme={"blue"}>View Donation Claims</Button>
          </Link>
          {/* <Button colorScheme={"blue"}>Add Campaign Expense</Button> */}
          <Button colorScheme={"blue"} onClick={onMilestoneOpen}>Add Campaign Milestone</Button>
        </Wrap>}
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
    </Box>
  );
}
