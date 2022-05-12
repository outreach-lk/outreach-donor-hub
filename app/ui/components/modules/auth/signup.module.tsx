import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../../../../hooks/auth.hooks";
import { UserRole } from "../../../../types/dtos/user.dtos";

//FIXME: Break this into components and conform to a consistent theming.
export function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { client } = useAuth();
  const { signUpWithEmail } = client;

  const handleUserSignUp: React.FormEventHandler = (e) => {
    e.preventDefault();
    const target = {
      email: (e.target as any).email.value as string,
      password: (e.target as any).password.value as string,
      // firstName: (e.target as any).firstName.value,
      // lastName: (e.target as any).lastName.value,
    };
    signUpWithEmail(target.email, target.password , UserRole.REGULAR);
  };

  return (
    <form onSubmit={handleUserSignUp}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} px={6}>
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
          <Stack spacing={6}>
            {/* <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack> */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
}
