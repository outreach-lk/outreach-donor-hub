import { Button, Box, Wrap } from "@chakra-ui/react";
import Cause from "../../../../data/entities/cause.entity";

interface CauseActionProps {
  cause: Cause;
}

export function CauseActions() {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="row"
      justifyContent="flex-end"
      width={{ base: "50%", sm: "100%" }}
    >
      <Wrap>
        <Button colorScheme={"blue"}>Donate</Button>
        <Button colorScheme={"linkedin"}>Share</Button>
        <Button colorScheme={"red"}>Report</Button>
      </Wrap>
    </Box>
  );
}
