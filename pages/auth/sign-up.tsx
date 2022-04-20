/** Sign up Page */
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
import { SignupCard } from "../../app/ui/components/modules/auth/signup.module";
import { Footer } from "../../app/ui/components/modules/Footer";
import Link from "next/link";
import { Nav } from "../../app/ui/components/modules/Navigation";

const Signup: NextPage = () => (
  <Box
    bg={mode(useBreakpointValue({ base: "white", sm: "gray.50" }), "gray.800")}
  >
    <Nav/>
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
              Create a new Account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text>Already have an account?</Text>
              <Link href={"/auth/sign-in"} passHref>
                <Button variant="link" colorScheme="blue">
                  Sign in
                </Button>
              </Link>
            </HStack>
          </Stack>
        </Stack>
        <SignupCard />
      </Stack>
    </Container>
    <Footer />
  </Box>
);

export default Signup;
