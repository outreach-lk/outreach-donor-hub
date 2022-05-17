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
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { CauseCard } from "../../app/ui/components/elements/cause/cause-card";
import { EntityListPage } from "../../app/ui/components/layouts/pages/entity/entity.list.layout";
import { Footer } from "../../app/ui/components/modules/Footer";
import { Nav } from "../../app/ui/components/modules/Navigation";
import { RichTextEditor } from "../../app/ui/components/modules/wyswyg-editor";

export default function CauseListPage() {
  const query = new Map<string, string>();
  query.set("isVerified", "true");
  return (
    <>
      <Nav />
      <Container minW={"full"} py="4"
       bg={useColorModeValue("gray.200", "auto")}
      >

        <Breadcrumb paddingBottom={"4"}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cause">Campaigns</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>All Campaigns</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb> 
        <Heading size={"md"}>All Campaigns</Heading>
        <Heading size={"sm"}>Only Verified Campaigns are shown</Heading>

        <EntityListPage
          entity="cause"
          query={query}
          showFullScreenLoader={true}
          isEmbedded={true}
          width="full"
        >
          {(data: CauseDto) => (
           <CauseCard cause={data}/>
          )}
        </EntityListPage>
      </Container>
      <Footer/>
    </>
  );
}
