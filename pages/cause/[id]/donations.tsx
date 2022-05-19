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
  HStack,
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
import { FaFile, FaImage, FaLink } from "react-icons/fa";
import Cause from "../../../app/data/entities/cause.entity";
import Donation from "../../../app/data/entities/donation.entity";
import { useAuth } from "../../../app/hooks/auth.hooks";
import { useEntity } from "../../../app/hooks/entity";
import { useFeedback } from "../../../app/hooks/feedback.hook";
import { DonationDto } from "../../../app/types/dtos/donation.dtos";
import { DonationStatus } from "../../../app/types/enums/status";
import { EntityListPage } from "../../../app/ui/components/layouts/pages/entity/entity.list.layout";
import { DonationCard } from "../../../app/ui/components/modules/donation/donation-card.module";
import { Footer } from "../../../app/ui/components/modules/Footer";
import { Nav } from "../../../app/ui/components/modules/Navigation";
import { getDateFromFirebaseDateTimeObject } from "../../../app/utils/date-time";

export default function CauseDonations() {
  const { query, push } = useRouter();

  const map = new Map<string, string>();
  map.set("causeId", "cause-" + query.id);
  const { fetchEntity, checkEntityPerms } = useEntity("cause");
  //checks if the current user can review this cause.
  const [canReview, setCanReview] = useState(true);

  const {user} = useAuth();
  useEffect(() => {
    fetchEntity("cause-" + query.id).then((res) => {
      if (res.data?.data) {
        const { canUpdate } = checkEntityPerms(new Cause(res.data.data));
        setCanReview(canUpdate);
      }
    });
  }, []);
  
  return (
    <>
      <Nav />
      <Container minW={"full"} p="4" bg={useColorModeValue("gray.200", "auto")}>
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
        <EntityListPage
          entity="donation"
          query={map}
          isEmbedded={true}
          showFullScreenLoader={true}
          emptyListScreen={
            <Box>
              <Heading>No Donations, Yet!</Heading>
              <Text>This campaign does not have donation claims</Text>
            </Box>
          }
        >
          {(_data: DonationDto) => {

            // FIXME: Move to own component
            return (
              <>
              {/* Donation Main Component */}
              <DonationCard data={_data} canReview={canReview} isOwner={_data.owner === user?.uid}/>
              </>
            );
          }}
        </EntityListPage>
      </Container>
      <Footer />
    </>
  );
}
