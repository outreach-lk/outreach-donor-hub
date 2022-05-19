/**
 * UI module for user signing in.
 * @kulathilake
 */
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import { useAuth } from "../../../../hooks/auth.hooks";
import { OAuthProviders } from "../../../../types/enums/providers";
import {
  OAuthButtonGroup,
  Props as OAuthButtonGroupProps,
} from "../../elements/auth/OAuthButtonGroup";
import { PasswordField } from "../../elements/auth/PasswordField";

export const SignInCard = () => {
  const { client } = useAuth();
  const { signInWithEmail, signInWithGoogle } = client;

  /**
   * Form sumbission handler for signing in with email and password
   * handles submissions and error messages.
   */
  const handleSignInWithEmail: React.FormEventHandler = (e) => {
    e.preventDefault();
    const target = {
      email: (e.target as any).email.value as string,
      password: (e.target as any).password.value as string,
    };
    signInWithEmail(target.email, target.password);
  };

  /**
   button click handler for signing in with Google.
   * @param e 
   */
  const handlesSignInWithGoogle: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    signInWithGoogle();
  };

  /**
   * OAuth Button Group Component Props including the click handlers.
   */
  const oAuthBtnGroupProps: OAuthButtonGroupProps = {
    handlers: [
      {
        name: OAuthProviders.GOOGLE,
        handler: handlesSignInWithGoogle,
      },
    ],
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
      <form onSubmit={handleSignInWithEmail}>
        <Stack spacing="6">
          <HStack>
            <Text fontSize="sm" whiteSpace="nowrap">
              Continue with
            </Text>
          </HStack>
          <OAuthButtonGroup handlers={oAuthBtnGroupProps.handlers} />
          <HStack>
          <Divider />
          <Text fontSize="sm" whiteSpace="nowrap">Or use your email</Text>
          <Divider />
          </HStack>
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" type="email" />
            </FormControl>
            <PasswordField />
          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultIsChecked>Remember me</Checkbox>
            <Link href={"/auth/reset"} passHref>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </Link>
          </HStack>
          <Stack spacing="6">
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              variant="primary"
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
