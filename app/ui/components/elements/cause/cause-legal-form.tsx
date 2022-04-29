import { WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Button, Heading,Stack,Text } from "@chakra-ui/react";
import { useAuth } from "../../../../hooks/auth.hooks";
import { Consent } from "../../../../types/dtos/consent";

interface CauseLegalForm {
  onSave: (consent: Consent) => void;
  init: Consent | null;
}
export function CauseLegalForm(props: CauseLegalForm) {
    const {isAuthorized, user} = useAuth();
    const createConsent = (consented:boolean):Consent=> {
        if(!isAuthorized) throw new Error('unauthorized to create consent');
        return {
            userId: user.uid,
            iConsent: consented,
            timestamp: Date.now()
        }
    }
    const handleConsent = (consented:boolean) => {
        props.onSave(createConsent(consented))
    }
  return (
    <Box>
      <Box textAlign="center" py={10} px={6}>
        <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Strong Legal Advice
        </Heading>
        <Text color={"gray.500"}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
        </Text>
      </Box>
      <Stack>
          <Button colorScheme={"blue"} disabled={props.init?.iConsent} onClick={()=>handleConsent(true)}>{
              (props.init?.iConsent)?'You have already agreed':'I Agree & and I wish to continue'
          }</Button>
          <Button variant={"link"} onClick={()=>handleConsent(false)}>I do not Agree &amp; and do not wish to continue</Button>
      </Stack>
    </Box>
  );
}
