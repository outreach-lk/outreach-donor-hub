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
        colorScheme={"blue"}
        style={{marginRight:'10px'}}
        >Donate</Button>
      <Button 
      colorScheme={"linkedin"}
      style={{marginRight:'10px'}}>
          Share</Button>
      <Button
        colorScheme={"red"}
      >Report</Button>
    </Box>
  );
}
