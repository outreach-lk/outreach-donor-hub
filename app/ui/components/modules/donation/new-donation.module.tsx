import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { storageClientFactory } from "../../../../api/clients";
import ClaimEvidence from "../../../../data/entities/claim-evidence";
import DonationRepo from "../../../../data/repos/donation.repo";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { ClaimEvidenceDto } from "../../../../types/dtos/claim-evidence";
import { DonationDto } from "../../../../types/dtos/donation.dtos";
import { FileDto, RemoteFileUploadResDto } from "../../../../types/dtos/remote-file.dtos";
import { FileStorageProvider } from "../../../../types/enums/providers";
import { FileUploader } from "../uploader";
import FilePicker from "../uploader/picker";

/**
 * make new donation claim
 */
interface NewDonationProps {
  causeId: string;
  refVal: string;
  onSave: () => void;
}
export default function NewDonation(props: NewDonationProps) {
  const { show } = useFeedback();
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [proof,setProof] = useState<File|null>(null);
  //FIXME: get these into a custom hook
  const client = storageClientFactory.getClient(FileStorageProvider.FIRESTORAGE);
  //method bindings
  //TODO: use a custom hook instead
  const uploadFile = client.uploadFile.bind(client);
  const fetchFile = client.fetchFile.bind(client);

  const handleSubmitClaim = async () => {
    setIsSubmitting(true);
    const data = {
        causeId: props.causeId,
        ref: props.refVal,
        amount,
        evidence: [],
    } as DonationDto
    let uploadRes: RemoteFileUploadResDto
    if(proof){
        uploadRes =  await uploadFile(proof);
        data.evidence?.push({
            attachments: uploadRes.data as FileDto
        })
    }
    DonationRepo.getRepo()
      .create(data)
      .then((res) => {
        show("Your donation claim was created", {
          type: "success",
          title: "New Donation Claim",
        });
        props.onSave();
      })
      .catch((err) => {
        show(err.message || err, {
          type: "error",
          title: "New Donation Claim Error",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <Box>
      <Wrap flexDirection={"column"}>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Proof of Transfer</FormLabel>  
          <FileUploader 
            preventUpload={true}
            callback={file=>setProof(file as File)}
          />
          <FormHelperText>eg: screen shot of bank receipt</FormHelperText>
        </FormControl>
        {/* <FormControl>
                <FormLabel>Proof of Transaction</FormLabel>
                <Input id="file" type="file" />
            </FormControl> */}
        <Box justifyItems="center" my="4">
          <Text>By clicking submit, you agree to the Terms of Use</Text>
          <Button
            onClick={handleSubmitClaim}
            colorScheme={"blue"}
            isLoading={isSubmitting}
            disabled={!amount || !proof}
          >
            Submit Donation Claim
          </Button>
        </Box>
      </Wrap>
    </Box>
  );
}
