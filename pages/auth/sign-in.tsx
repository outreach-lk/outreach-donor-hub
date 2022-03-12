/** Login Page */
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  useBreakpointValue,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";

import { Logo } from "../../app/ui/components/elements/branding/Logo";
import { SignInCard } from "../../app/ui/components/modules/auth/signin.module";
import { Footer } from "../../app/ui/components/modules/Footer";
import Link from "next/link";

const Login: NextPage = () => (
  <Box
    bg={mode(useBreakpointValue({ base: "white", sm: "gray.50" }), "gray.800")}
  >
    <Container
      maxW="lg"
      py={{ base: "0", md: "8" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={useBreakpointValue({ base: "xs", md: "sm" })}>
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text>Don&apos;t have an account?</Text>
              <Link href={"/auth/sign-up"} passHref>
                <Button  variant="link" colorScheme="blue">
                  Sign up
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
            <SignInCard/>
      </Stack>
    </Container>
            <Footer/>
  </Box>
);

export default Login
