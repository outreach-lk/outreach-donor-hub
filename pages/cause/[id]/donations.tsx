/**
 * donations related to a given cause
 */

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  Wrap,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaLink } from "react-icons/fa";
import Donation from "../../../app/data/entities/donation.entity";
import { useFeedback } from "../../../app/hooks/feedback.hook";
import { DonationDto } from "../../../app/types/dtos/donation.dtos";
import { DonationStatus } from "../../../app/types/enums/status";
import { EntityListPage } from "../../../app/ui/components/layouts/pages/entity/entity.list.layout";
import { Footer } from "../../../app/ui/components/modules/Footer";
import { Nav } from "../../../app/ui/components/modules/Navigation";
import { getDateFromFirebaseDateTimeObject } from "../../../app/utils/date-time";

export default function CauseDonations() {
  const { query, push } = useRouter();
  const map = new Map<string, string>();
  map.set("causeId", "cause-" + query.id);
  const {show} = useFeedback();
  const handleDonationStatusChange = (
    status: DonationStatus,
    donation: Donation
  ) => {
    let task: Promise<any>;
    if (status === DonationStatus.ACKNOWLEDGED) {
        task = donation.confirmDonationClaim()
    } else{
        task = donation.disputeDonationClaim();
    }
    task
    .then(()=>{
        show('Donation Claim Acknowledged.',{
            type:'success'
        })
    })
    .catch(()=>{
        show('Error updating claim status',{
            type:'error'
        })
    })
  };
  return (
    <>
      <Nav />
      <Container minW={"full"} p="4">
        <Wrap direction={"column"}>
          <Heading size={"sm"}>Donations</Heading>
          <Button
            onClick={() => {
              push("/cause/" + query.id);
            }}
          >
            Back to Campaign
          </Button>
        </Wrap>
        <EntityListPage entity="donation" query={map} isEmbedded={true}>
          {(_data: DonationDto) => {
            const data = new Donation(_data);
            // FIXME: Move to own component
            return (
              <Box p="4" shadow={"md"}>
                <Flex align={"baseline"} justify="space-between">
                  <Box>
                    <Text>
                      {getDateFromFirebaseDateTimeObject(
                        (data as any).createdOn
                      ).toLocaleDateString()}
                    </Text>
                    <Stat>
                      <StatLabel>Amount</StatLabel>
                      <StatNumber>{data.amount.toFixed(2)}</StatNumber>
                    </Stat>
                  </Box>
                  <Box>
                    Donor Ref:
                    <Heading>{data.ref}</Heading>
                    <Tooltip label={data.id}>
                      <Flex
                        align={"baseline"}
                        cursor="pointer"
                        textDecoration={"underline"}
                      >
                        <FaLink /> <small>Unique Donation Id</small>
                      </Flex>
                    </Tooltip>
                    <Wrap py="2">
                      <Button
                        disabled={data.status === DonationStatus.ACKNOWLEDGED}
                        colorScheme={"blue"}
                        onClick={() =>
                          handleDonationStatusChange(
                            DonationStatus.ACKNOWLEDGED,
                            data
                          )
                        }
                      >
                        Confirm Claim
                      </Button>
                      <Button
                        disabled={data.status === DonationStatus.DISPUTED}
                        colorScheme={"red"}
                        onClick={() =>
                          handleDonationStatusChange(
                            DonationStatus.DISPUTED,
                            data
                          )
                        }
                      >
                        Dispute Claim
                      </Button>
                    </Wrap>
                  </Box>
                </Flex>
              </Box>
            );
          }}
        </EntityListPage>
      </Container>
      <Footer />
    </>
  );
}
