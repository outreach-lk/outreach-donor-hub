/**
 * Cause Page
 */

import {
  Box,
  Container,
  Heading,
  Link,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { CauseActions } from "../../app/ui/components/elements/cause/cause.actions";
import { CauseStats } from "../../app/ui/components/elements/cause/cause.stats";
import { TimelineEvent } from "../../app/ui/components/elements/timeline/timeline-event";
import { EntityPage } from "../../app/ui/components/layouts/pages/entity/entity.layout";
import { Timeline } from "../../app/ui/components/modules/activity-timeline/timeline.module";

export default function CausePage() {
  const { query } = useRouter();
  return (
    <EntityPage entity="cause" id={query.id as string}>
      {(data: CauseDto) => {
        console.log(data);
        return (
          <>
            <Container maxW={"7xl"} p="12">
            <Heading marginTop="1">{data.title}</Heading>

              <Box
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
              >
                {/* Attachments & Description  */}
                <Box
                  display="flex"
                  width={{ base: '100%', sm: '85%' }}
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: "3", sm: "0" }}
                >
                  <Text
                    as="p"
                    marginTop="2"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="lg"
                  >
                    {data.description}
                  </Text>
                </Box>
                {/* Cause Stats  */}
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent={"center"}
                  alignItems={{md:'flex-end',sm:'self-end'}}
                  marginTop={{ base: "3", sm: "0" }}
                >   
                    <CauseStats
                        amount={100}
                        currency="LKR"
                        target={10000}
                    />
                    <CauseActions/>
                </Box>
              </Box>
              {/* Cause Activity */}
              <Box
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"      
              >
                  <Heading size={'md'}>
                      Cause Activity
                  </Heading>
              </Box>
              {/* Similar Causes */}
                <Timeline/>
            </Container>
          </>
        );
      }}
    </EntityPage>
  );
}
