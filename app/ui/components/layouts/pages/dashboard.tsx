import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaDonate, FaExclamationCircle, FaExternalLinkAlt, FaRss, FaUser, FaUsers } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiMonitor, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import React, { PropsWithChildren } from "react";
import { Logo } from "../../elements/branding/Logo";
import { Nav } from "../../modules/Navigation";
import { GoChecklist } from "react-icons/go";

export function DashboardLayout(props: PropsWithChildren<any>) {
  const sidebar = useDisclosure();

  const NavItem = (props: any) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        _hover={{
          bg: "linkedin.100",
          color: "linkedin.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        bg={props.isActive?"linkedin.300":"auto"}
        color={props.isActive?"linkedin.900":"auto"}

        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "linkedin.800",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("auto","linkedin.900")}
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Stack>
          <Logo withTitle={true} />
          <Text fontSize="sm" ml="2" color={useColorModeValue("linkedin.800","white")} fontWeight="semibold">
            Moderator Mode
          </Text>
        </Stack>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color={useColorModeValue("gray.600","white")}
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome}>Home</NavItem>
        <NavItem isActive={true} icon={FaDonate}>Campaigns</NavItem>
        <NavItem icon={HiCollection}>Pending Claims</NavItem>
        <NavItem icon={FaExclamationCircle}>Disputes</NavItem>
        <NavItem icon={FaUsers}>Users</NavItem>
        <NavItem icon={FaExternalLinkAlt}>Use Site</NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Nav dashboardMode={true} drawerToggle={sidebar.onToggle}/>

        <Box as="main" p="4">
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}
