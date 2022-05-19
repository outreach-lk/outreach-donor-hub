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
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
          {props.children ? (
            props.children
          ) : (
            <Heading>There's Nothing Here, Yet!</Heading>
          )}
    </Flex>
  );
}
