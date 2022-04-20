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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { EntityPage } from "../../app/ui/components/layouts/pages/entity/entity.layout";

export default function CausePage() {
  const { query } = useRouter();
  return (
    <EntityPage entity="cause" id={query.id as string}>
      {(data: CauseDto) => {
        console.log(data);
        return (
          <>
            <Container maxW={"7xl"} p="12">
              <Box
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
              >
                {/* Title & Description  */}
                <Box
                  display="flex"
                  width={{ base: '100%', sm: '85%' }}
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: "3", sm: "0" }}
                >
                  <Heading marginTop="1">{data.title}</Heading>
                  <Text
                    as="p"
                    marginTop="2"
                    color={useColorModeValue("gray.700", "gray.200")}
                    fontSize="lg"
                  >
                    {data.description}
                  </Text>
                </Box>
                {/* Cause Attachments */}
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: "3", sm: "0" }}
                >

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

            </Container>
          </>
        );
      }}
    </EntityPage>
  );
}
