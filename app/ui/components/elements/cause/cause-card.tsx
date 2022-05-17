import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  chakra,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Tooltip,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { CauseDto } from "../../../../types/dtos/cause.dtos";
import { RichTextEditor } from "../../modules/wyswyg-editor";
import { EntityVerifiedBanner } from "../entity-verified-banner";
import { CauseStats } from "./cause.stats";

interface CauseCardProps {
  cause: CauseDto;
}
export function CauseCard(props: CauseCardProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const data = props.cause;
  const image = data.attachments.find((file) => file?.path)?.path;
  const router = useRouter();
  /** navigates to cause duh */
  const navigateToCause = () => {
    setIsNavigating(true);
    router.push({
      pathname: "/cause/[id]",
      query: {
        id: data.id?.split("cause-")[1],
      },
    });
  };
  return (
    <Flex
      //   bg={useColorModeValue("#F9FAFB", "gray.600")}
      py={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        w={{ base: "full", md: "4xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        <Box w={{ lg: "50%" }}>
          <Box
            h={{ base: 64, lg: "full" }}
            rounded={{ lg: "lg" }}
            bgSize="cover"
            bgPos={"center"}
            style={{
              backgroundImage: `url('${image}')`,
            }}
          >
          </Box>
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
        <EntityVerifiedBanner 
            isVerified={Boolean(data.isVerified)} 
            entity="Campaign" 
            tooltip={{
              verified: "This campaign has been Verified by DonorHub Mods.",
              unverified: "This campaign has not been verified by DonorHub Mods."
            }}
            />
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            {data.title}
          </chakra.h2>
          <Box
            mt={4}
            color={useColorModeValue("gray.600", "gray.400")}
            maxH="xs"
            overflow={"clip"}
            textOverflow={"ellipsis"}
            whiteSpace={"normal"}
          >
            <RichTextEditor
              blocklist={data.description.slice(0, 2)}
              treeGrabber={() => {}}
              init={{
                readonly: true,
                hideMenu: true,
              }}
            />
          </Box>

          <Flex mt={8} justifyContent="space-between" justify="flex-end">
            <Button
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              colorScheme={"blue"}
              onClick={navigateToCause}
              isLoading={isNavigating}
            >
              Read More
            </Button>
            <Box>
              <CauseStats
                currency={data.currency || "Rs"}
                currentCollection={data.currentCollection}
                expenses={data.expenses}
                target={data.target || 0}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
  //   return (
  //     <Box
  //       p="4"
  //       my="4"
  //       shadow={"lg"}
  //       rounded="md"
  //       bg={useColorModeValue("white", "linkedin.900")}
  //       maxH="lg"
  //       display={"flex"}
  //       alignItems="flex-end"
  //     >
  //       <Box overflow={"hidden"} maxH="xl">
  //         <HStack>
  //           <Heading>{data.title}</Heading>

  //         </HStack>
  //         <Box>{image && <img src={image} alt="H" />}</Box>
  //         <Box maxH={"300px"} overflow="hidden">
  //           <RichTextEditor
  //             blocklist={data.description.slice(0, 2)}
  //             treeGrabber={() => {}}
  //             init={{
  //               readonly: true,
  //               hideMenu: true,
  //             }}
  //           />
  //         </Box>
  //       </Box>
  //       <Box p={"2"}>
  //         <Link
  //
  //           passHref
  //         >
  //           <Button colorScheme={"blue"}>Read More</Button>
  //         </Link>
  //       </Box>
  //     </Box>
  //   );
}
