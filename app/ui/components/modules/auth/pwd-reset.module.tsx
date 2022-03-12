import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "../../../../hooks/auth.hooks";

export const ResetCard = () => {
  const { client } = useAuth();
  const { resetPassword } = client;

  const handleResetSubmission: React.FormEventHandler = (e) => {
    e.preventDefault();
    const target = {
      email: (e.target as any).email.value,
    };
    resetPassword(target.email);
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
      <form onSubmit={handleResetSubmission}>
        <Stack spacing={6}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
        </Stack>
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
            Reset Password
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
