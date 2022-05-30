import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  Avatar,
  HStack,
  Center,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { UserDto } from "../../../../types/dtos/user.dtos";
import { EntityVerifiedBanner } from "../entity-verified-banner";

export function UserCard(props: UserDto) {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "auto")}
      p={4}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="xs"
        bg={useColorModeValue("white", "linkedin.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Box py={5} textAlign="center">
          <Avatar size="lg" />
          <chakra.div>
            <Badge>{props.role}</Badge>
          </chakra.div>
          <Link
            display="block"
            fontSize="md"
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            {props.firstName} {props.lastName}
          </Link>
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            {props.email}
          </chakra.span>

          <Center>
            <EntityVerifiedBanner
              entity="user"
              isVerified={props.isVerifiedUser}
              tooltip={{
                unverified: "User has not completed the KYC verification",
                verified: "Verified User",
              }}
            />
          </Center>
        </Box>
      </Box>
    </Flex>
  );
}
