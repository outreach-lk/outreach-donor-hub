import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Wrap,
  Heading,
} from "@chakra-ui/react";
import NxtLink from "next/link";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo } from "../elements/branding/Logo";
import { useAuth } from "../../../hooks/auth.hooks";

export function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthorized, client } = useAuth();
  const handleLogout = () => {
    client.logout();
  }
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
              {/* <NxtLink href={"/cause/new"} passHref>
                <Button as="a" colorScheme={"blue"}>
                  Create Campaign
                </Button>
              </NxtLink> */}
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
                    src={"https://avatars.dicebear.com/api/croodles-neutral/outreach.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/croodles-neutral/outreach.svg"}
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
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
