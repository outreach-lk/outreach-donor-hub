import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Text, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import DonationRepo from "../../../../data/repos/donation.repo";

/**
 * make new donation claim
 */
interface NewDonationProps {
    causeId: string,
    refVal: string,
}
export default function NewDonation(props:NewDonationProps){
    const [amount,setAmount] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleSubmitClaim = () => {
        setIsSubmitting(true);
        DonationRepo.getRepo().create({
            causeId: props.causeId,
            ref: props.refVal,
            amount,
        })
    }
    return (
        <Box>
            <Wrap flexDirection={"column"}>
            <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input id="amount" type="number" value={amount} onChange={(e)=>setAmount(parseFloat(e.target.value))} />
            </FormControl>
            {/* <FormControl>
                <FormLabel>Proof of Transaction</FormLabel>
                <Input id="file" type="file" />
            </FormControl> */}
            <Box  justifyItems="center" my="4">
                <Text>By clicking submit, you agree to the Terms of Use</Text>
                <Button 
                    onClick={handleSubmitClaim}
                    colorScheme={"blue"}
                    isLoading={isSubmitting}
                    >Submit Donation Claim</Button>
            </Box>
            </Wrap>
        </Box>
    )
}