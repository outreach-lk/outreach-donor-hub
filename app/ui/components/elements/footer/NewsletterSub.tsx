import {
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

export function NewsLetterSubscribe() {
  return (
    <Stack>
      <Heading size={"xs"}>Subscribe to Mail List</Heading>
      <Stack direction={"row"}>
        <Input
          bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
          _focus={{
            bg: "whiteAlpha.300",
          }}
          placeholder={"Your email address"}
          border={0}
        />
        <IconButton
          colorScheme={"blue"}
          aria-label="Subscribe"
          icon={<EmailIcon />}
        />
      </Stack>
    </Stack>
  );
}
