import { Button, Box, Wrap, useDisclosure } from "@chakra-ui/react";
import Cause from "../../../../data/entities/cause.entity";
import NewDonationClaim from "../../modules/donation/new-donation.module";

interface CauseActionProps {
  cause: Cause;
}

export function CauseActions(props: CauseActionProps) {
  const { isOpen: isDonationOpen, onOpen: onDonationOpen, onClose: onDonationClose } = useDisclosure();
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="row"
      justifyContent="flex-end"
      width={{ base: "50%", sm: "100%" }}
    >
      <Wrap>
        <Button colorScheme={"blue"} onClick={onDonationOpen}>Donate</Button>
        <Button colorScheme={"linkedin"}>Share</Button>
        <Button colorScheme={"red"}>Report</Button>
      </Wrap>
      <NewDonationClaim
        cause={props.cause}
        isOpen={isDonationOpen}
        onClose={onDonationClose}
      />
    </Box>
  );
}
