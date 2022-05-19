import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "../../app/hooks/auth.hooks";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { CauseCard } from "../../app/ui/components/elements/cause/cause-card";
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
    <Container minW="full" p="4"
       bg={useColorModeValue("gray.200", "auto")}
    
    >
      <Wrap direction={"column"}>
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
      </Wrap>

        <EntityListPage 
          entity="cause" 
          query={query} 
          isEmbedded={true} 
          width="full" 
          showFullScreenLoader={true}
          emptyListScreen={
            <Stack>
              <Heading>No Campaigns, Yet!</Heading>
              <Text >You don't have any campaign under your name.</Text>
              <Center>
                <Link href={"/cause/new"} passHref>
                  <Button as="a" colorScheme={"blue"}>Create Campaign</Button>
                </Link>
              </Center>
            </Stack>
          }>
          {(data: CauseDto) => (
            // Should be in own component element file.
            <CauseCard cause={data}/>
          )}
        </EntityListPage>
    </Container>
    <Footer/>
    </>
      );
}
