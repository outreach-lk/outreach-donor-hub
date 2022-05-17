import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Spacer,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../../app/hooks/auth.hooks";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { EntityListPage } from "../../app/ui/components/layouts/pages/entity/entity.list.layout";
import { Footer } from "../../app/ui/components/modules/Footer";
import { Nav } from "../../app/ui/components/modules/Navigation";
import { RichTextEditor } from "../../app/ui/components/modules/wyswyg-editor";

export default function CauseListPage() {
  const query = new Map<string, string>();
  const {user} = useAuth();
  query.set('owner', user.uid)
  return (
      <>
      <Nav/>
    <Container minW="full" p="4">
        <Breadcrumb paddingBottom={"4"}>
            <BreadcrumbItem>
                <BreadcrumbLink href="/me">Profile ({user.email})</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>My Campaigns</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Heading size={"md"}>My Campaigns</Heading>
        <Heading size={"sm"}>Campaigns created by You</Heading>

        <EntityListPage entity="cause" query={query} isEmbedded={true}>
          {(data: CauseDto) => (
            // Should be in own component element file.
            <Box
              p="4"
              my="4"
              shadow={"lg"}
              rounded="md"
              bg={useColorModeValue("azure.100", "linkedin.900")}
              maxH="lg"
              display={"flex"}
              alignItems="flex-end"
            >
              <Box
                overflow={"hidden"}
              >
                <HStack>
                  <Heading>{data.title}</Heading>
                  <Tooltip
                    label={
                      data.isVerified
                        ? "This campaign has been verified by DonorHub mods"
                        : "This campaign is not verified"
                    }
                  >
                    <CheckCircleIcon
                      color={data.isVerified ? "linkedin.600" : "grey"}
                    />
                  </Tooltip>
                </HStack>
                <RichTextEditor
                  blocklist={data.description.slice(0, 4)}
                  treeGrabber={() => {}}
                  init={{
                    readonly: true,
                    hideMenu: true,
                  }}
                />
              </Box>
                <Box p={"2"}> 
                <Link
                  href={{
                    pathname: "/cause/[id]",
                    query: {
                      id: data.id?.split("cause-")[1],
                    },
                  }}
                  passHref
                >
                  <Button colorScheme={"blue"}>Read More</Button>
                </Link>
                </Box>
            </Box>
          )}
        </EntityListPage>
    </Container>
    <Footer/>
    </>
      );
}
