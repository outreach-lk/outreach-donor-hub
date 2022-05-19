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
  useBreakpoint,
  Center,
  Wrap,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import NxtLink from "next/link";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo } from "../elements/branding/Logo";
import { useAuth } from "../../../hooks/auth.hooks";
import { FiSearch } from "react-icons/fi";

export function Nav(props: {
  dashboardMode?: boolean;
  drawerToggle?: () => void;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAuthorized, client, user } = useAuth();
  const handleLogout = () => {
    client.logout();
  };
  return (
    <>
      <Box bg={useColorModeValue("white", "gray.900")} px={4} shadow="md">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {!props.dashboardMode && (
            <NxtLink
              href={{
                pathname: "/cause/list",
              }}
              passHref
            >
              <Wrap as="a" align={"center"} spacing="20px">
                <Logo withTitle={true} />
              </Wrap>
            </NxtLink>
          )}
          {props.dashboardMode && (
            <InputGroup w="96" display={{ base: "none", md: "flex" }}>
              <InputLeftElement color="gray.500">
                <FiSearch />
              </InputLeftElement>
              <Input placeholder="Search DonorHub" />
            </InputGroup>
          )}

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {isAuthorized && !props.dashboardMode && (
                <NxtLink href={"/cause/new"} passHref>
                  <Button
                    display={{ base: "none", sm: "flex" }}
                    as="a"
                    colorScheme={"blue"}
                  >
                    Create Campaign
                  </Button>
                </NxtLink>
              )}
             {props.dashboardMode && <Button onClick={props.drawerToggle} display={{base:'block',sm:'none'}}>
                <HamburgerIcon/>
              </Button>}
               <Button onClick={toggleColorMode} >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {isAuthorized ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://avatars.dicebear.com/api/adventurer-neutral/" +
                        user.uid +
                        ".svg?mouth=variant02&eyes=variant13"
                      }
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"} zIndex="modal">
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/adventurer-neutral/" +
                          user.uid +
                          ".svg?mouth=variant02&eyes=variant13"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <NxtLink href={"/cause/new"} passHref>
                      <MenuItem as="a">Create Campaign</MenuItem>
                    </NxtLink>
                    <NxtLink href={"/me/campaigns"} passHref>
                      <MenuItem as="a">My Campaigns</MenuItem>
                    </NxtLink>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <NxtLink href="/auth/sign-in" passHref>
                  <Button as="a" colorScheme={"blue"}>
                    Sign In
                  </Button>
                </NxtLink>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
