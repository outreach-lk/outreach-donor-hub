import React from "react";
import {
  chakra,
  Box,
  Stack,
  Flex,
  useColorModeValue,
  Link,
  Heading,
} from "@chakra-ui/react";

export function NoItemsCallForAction(props: React.PropsWithChildren<any>) {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        justify="center"
        bg={useColorModeValue("white", "gray.800")}
        w="full"
      >
        <Box
          w={{ base: "full", md: "75%", lg: "50%" }}
          px={4}
          py={20}
          textAlign={{ base: "left", md: "center" }}
        >
          {props.children ? (
            props.children
          ) : (
            <Heading>There's Nothing Here, Yet!</Heading>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}
