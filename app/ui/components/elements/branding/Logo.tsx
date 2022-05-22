import {
  chakra,
  Heading,
  HStack,
  HTMLChakraProps,
  Icon,
  Image,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaDonate } from "react-icons/fa";
import { getConfig } from "../../../../config";

export const Logo = (
  props: HTMLChakraProps<"svg"> & {
    withTitle?: boolean;
    width?: string;
    isWhite?: boolean;
    titleInline?: boolean;
    isCenterd?: boolean;
  }
) => {
  const { title } = getConfig();

  return (
    <Stack
      align={props.titleInline ? "center" : props.isCenterd?"center":"flex-start"}
      direction={props.titleInline ? "row" : "column"}
    >
      <Image
        src={
          props.isWhite
            ? "/assets/logo/logo-white.svg"
            : useColorModeValue(
                "/assets/logo/logo.svg",
                "/assets/logo/logo-dark.svg"
              )
        }
        width={props.width || "60px"}
      />
      {props.withTitle && (
        <Heading
          fontFamily={"'Mukta', sans-serif"}
          color={
            props.isWhite
              ? useColorModeValue("white", "white")
              : useColorModeValue("blue.800", "blue.500")
          }
        >
          {title}
        </Heading>
      )}
    </Stack>
  );
};
