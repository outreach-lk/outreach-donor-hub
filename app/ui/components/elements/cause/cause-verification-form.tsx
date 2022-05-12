import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
interface CauseVerificationFormProps{
    submissionInProgress: boolean;
    onSubmitToVerify: ()=>void;
}
export function CauseVerificationForm(props: CauseVerificationFormProps){
    return (
        <Box maxW="96">
            <Heading>🎊 Congratulations!</Heading>
            <Heading size={"md"}>...on coming so far.</Heading>
            <Text py="4">
                You may now submit your Donation Campaign (Cause) for 
                human verification, where a team of volunteering moderators will try to confirm the credibility 
                of the claims you have made and ensure nothing fishy gets through.<br/>
                This process might take upto couple of days depending on the availability of mods.<br/>
                We thank you for you patience. <br/><br/>

                We may contact you from time to time.
            </Text>
            <Box py="12">
                <Button 
                    onClick={props.onSubmitToVerify} 
                    colorScheme={"blue"}
                    isLoading={props.submissionInProgress}
                    >Submit for Verification</Button>
            </Box>
        </Box>
    )
}