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
  HStack,
  Text,
} from "@chakra-ui/react";
import NxtLink from "next/link";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Logo } from "../elements/branding/Logo";
import { useAuth } from "../../../hooks/auth.hooks";
import { FiSearch } from "react-icons/fi";
import { UserRole } from "../../../types/dtos/user.dtos";
import { GoDashboard, GoSignOut } from "react-icons/go";
import { NavItem } from "../elements/dashboard/nav-item";

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
      <Box
        bg={useColorModeValue(
          "linkedin.600",
          props.dashboardMode ? "gray.800" : "linkedin.900"
        )}
        px={{ base: "10", sm: "20" }}
        py="2"
        shadow="md"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            {props.dashboardMode && (
              <Button
                onClick={props.drawerToggle}
                display={{ base: "flex", sm: "none" }}
                size="xs"
              >
                <HamburgerIcon />
              </Button>
            )}
            {!props.dashboardMode && (
              <NxtLink
                href={{
                  pathname: "/cause/list",
                }}
                passHref
              >
                <Wrap as="a" align={"center"} spacing="20px">
                  <Logo withTitle={true} isWhite={true} titleInline={true} />
                </Wrap>
              </NxtLink>
            )}
          </HStack>
          {false && (
            <InputGroup w="96" display={{ base: "none", md: "flex" }}>
              <InputLeftElement color="white">
                <FiSearch />
              </InputLeftElement>
              <Input placeholder="Search DonorHub" color={"white"} />
            </InputGroup>
          )}

          <Flex></Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7} align="center">

              {isAuthorized && !props.dashboardMode && (
                <NxtLink href={"/cause/new"} passHref>
                  <Button
                    display={{ base: "none", sm: "flex" }}
                    as="a"
                    colorScheme={"facebook"}
                  >
                    Create Campaign
                  </Button>
                </NxtLink>
              )}

              {isAuthorized ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"md"} />
                  </MenuButton>
                  <MenuList alignItems={"center"} zIndex="modal">
                    <br />
                    <Center>
                      <Avatar size={"2xl"} />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    {(user.role === UserRole.ADMIN ||
                      user.role === UserRole.MODERATOR) && (
                      <>
                        {props.dashboardMode ? (
                          <NxtLink href={"/cause/list"} passHref>
                            <MenuItem as="a">
                              Back to Site
                            </MenuItem>
                          </NxtLink>
                        ) : (
                          <NxtLink href={"/mod/dashboard"} passHref>
                            <MenuItem as="a">
                              Dashboard
                            </MenuItem>
                          </NxtLink>
                        )}
                        <MenuDivider />
                      </>
                    )}
                    <NxtLink href={"/cause/new"} passHref>
                      <MenuItem as="a">Create Campaign</MenuItem>
                    </NxtLink>
                    <NxtLink href={"/me/campaigns"} passHref>
                      <MenuItem as="a">My Campaigns</MenuItem>
                    </NxtLink>
                    <MenuDivider />
                    <MenuItem onClick={toggleColorMode}>
                      {colorMode === "light" ? (
                        <HStack>
                          <MoonIcon />
                          <Text>Switch to Dark Mode</Text>
                        </HStack>
                      ) : (
                        <HStack>
                          <SunIcon />
                          <Text>Switch to Light Mode</Text>
                        </HStack>
                      )}
                    </MenuItem>
                    <MenuItem icon={<GoSignOut />} onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <NxtLink href="/auth/sign-in" passHref>
                    <Button as="a" colorScheme={"blue"}>
                      Sign In
                    </Button>
                  </NxtLink>
                  <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
