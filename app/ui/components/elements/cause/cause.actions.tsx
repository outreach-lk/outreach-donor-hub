import { Button, Box } from "@chakra-ui/react";
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
      width={{ base: '50%', sm: '100%' }}

    >
      <Button 
        backgroundColor={"purple"} 
        color={"white"} 
        style={{marginRight:'10px'}}
        >Donate</Button>
      <Button style={{marginRight:'10px'}}>Share</Button>
      <Button>Report</Button>
    </Box>
  );
}
