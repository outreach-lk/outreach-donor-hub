/**
 * donations related to a given cause
 */

import {
  Badge,
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
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import Cause from "../../../app/data/entities/cause.entity";
import Donation from "../../../app/data/entities/donation.entity";
import { useAuth } from "../../../app/hooks/auth.hooks";
import { useEntity } from "../../../app/hooks/entity";
import { useFeedback } from "../../../app/hooks/feedback.hook";
import { DonationDto } from "../../../app/types/dtos/donation.dtos";
import { DonationStatus } from "../../../app/types/enums/status";
import { EntityListPage } from "../../../app/ui/components/layouts/pages/entity/entity.list.layout";
import { Footer } from "../../../app/ui/components/modules/Footer";
import { Nav } from "../../../app/ui/components/modules/Navigation";
import { getDateFromFirebaseDateTimeObject } from "../../../app/utils/date-time";

export default function CauseDonations() {
  const { query, push } = useRouter();
  const { fetchEntity, checkEntityPerms } = useEntity("cause");
  const [canReview, setCanReview] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEntity("cause-" + query.id).then((res) => {
      if (res.data?.data) {
        const { canUpdate } = checkEntityPerms(new Cause(res.data.data));
        setCanReview(canUpdate);
      }
    });
  }, []);

  const map = new Map<string, string>();
  map.set("causeId", "cause-" + query.id);
  const { show } = useFeedback();
  const handleDonationStatusChange = (
    status: DonationStatus,
    donation: Donation
  ) => {
    let task: Promise<any>;
    if (status === DonationStatus.ACKNOWLEDGED) {
      task = donation.confirmDonationClaim();
    } else {
      task = donation.disputeDonationClaim();
    }
    task
      .then(() => {
        show("Donation Claim Acknowledged.", {
          type: "success",
        });
      })
      .catch(() => {
        show("Error updating claim status", {
          type: "error",
        });
      });
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
            const isDisputed = data.status === DonationStatus.DISPUTED;
            const isPending =
              data.status === DonationStatus.CLAIMED ||
              data.status === undefined;
            const isConfirmed = data.status === DonationStatus.ACKNOWLEDGED;
            // FIXME: Move to own component
            return (
              <Box mb="4" p="4" shadow={"md"} bg={useColorModeValue("azure.100", "linkedin.900")}>
                {data.owner === user?.uid && (
                  <Badge colorScheme={"blue"}>Your Donation</Badge>
                )}
                {isDisputed && <Badge colorScheme={"red"}>Disputed</Badge>}
                {isPending && (
                  <Badge colorScheme={"yellow"}>Pending Confirmation</Badge>
                )}
                {isConfirmed && <Badge colorScheme={"green"}>Confirmed</Badge>}
                <Flex
                  textDecoration={isDisputed ? "line-through" : ""}
                  align={"baseline"}
                  justify="space-between"
                >
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
                    {data.status === DonationStatus.CLAIMED && canReview && (
                      <Wrap py="2">
                        <Button
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
                    )}
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
