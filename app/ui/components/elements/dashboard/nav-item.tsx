import { Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Renderable } from "../../../../types/props/common";

interface DashboardNavItemProps{
    icon: any,
    children: Renderable,
    route: string
}
export function NavItem(props: DashboardNavItemProps) {
    const { icon, children, ...rest } = props;
    const [isActive,setIsActive] = useState(false);
    const {push, route} = useRouter();

    useEffect(()=>{
        setIsActive(!!route.match(props.route))
    },[route])
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
        bg={isActive?"linkedin.300":"auto"}
        color={isActive?"linkedin.900":"auto"}
        onClick={()=>push(props.route)}
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