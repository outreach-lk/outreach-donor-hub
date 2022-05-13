import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Input, Text, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import DonationRepo from "../../../../data/repos/donation.repo";
import { useFeedback } from "../../../../hooks/feedback.hook";

/**
 * make new donation claim
 */
interface NewDonationProps {
    causeId: string,
    refVal: string,
    onSave: () => void
}
export default function NewDonation(props:NewDonationProps){
    const {show} = useFeedback();
    const [amount,setAmount] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const handleSubmitClaim = () => {
        setIsSubmitting(true);
        DonationRepo.getRepo().create({
            causeId: props.causeId,
            ref: props.refVal,
            amount,
        })
        .then(res=>{
            show('Your donation claim was created',{
                type: 'success',
                title: 'New Donation Claim'
            })
            props.onSave();
        })
        .catch(err=>{
            show(err.message || err, {
                type: 'error',
                title: 'New Donation Claim Error'
            })
        })
        .finally(()=>{
            setIsSubmitting(false);
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