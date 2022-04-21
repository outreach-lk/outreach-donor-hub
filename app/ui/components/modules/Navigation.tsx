import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  Wrap,
  Heading,
} from "@chakra-ui/react";
import NxtLink from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo } from "../elements/branding/Logo";
import { useAuth } from "../../../hooks/auth.hooks";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthorized } = useAuth();
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        shadow="md"
        position={"sticky"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Wrap align={"center"} spacing="20px">
            <Logo />
            <Heading color="linkedin.700">DonorHub</Heading>
          </Wrap>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {isAuthorized?<Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
              :
              <NxtLink 
                href="/auth/sign-in"
                passHref
              >
                <Button as="a" colorScheme={"blue"}>Sign In</Button>
              </NxtLink>
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
