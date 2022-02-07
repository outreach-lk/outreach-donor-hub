/**
 * UI module for user signing in.
 * @kulathilake
 */
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { useAuth } from "../../../hooks/auth.hooks";
import { OAuthButtonGroup } from "../elements/auth/OAuthButtonGroup";
import { PasswordField } from "../elements/auth/PasswordField";

export const Authenticator = () => {
  const { client } = useAuth();
  const { signInWithEmail } = client;

  // TODO: move method binding logic elsewhere.
  // TODO: use a wrapper Form element for all forms which 
  // handles submissions and error messages.
  const handleLogin: React.FormEventHandler = (e) => {
    e.preventDefault();
    signInWithEmail.bind(client)("demo@shehan.clk", "hello");
  };

  return (
    <Box
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={mode(
        "white",
        useBreakpointValue({ base: "inherit", sm: "gray.700" })
      )}
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <form onSubmit={handleLogin}>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
            <PasswordField />
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultIsChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password?
            </Button>
          </HStack>
          <Stack spacing="6">
            <Button type="submit" variant="primary">
              Sign in
            </Button>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <OAuthButtonGroup />
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
