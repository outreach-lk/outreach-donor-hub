import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Footer } from "../../../../../app/ui/components/modules/Footer";
import { Nav } from "../../../../../app/ui/components/modules/Navigation";
import { RichTextEditor, SerializableBlock } from "../../../../../app/ui/components/modules/wyswyg-editor";
import { useAuth } from "../../../../../app/hooks/auth.hooks";
import { UserRole } from "../../../../../app/types/dtos/user.dtos";
import { PropsWithChildren } from "react";
interface ArticlePageProps  {
    name: string;
    heading: string;
    blocks: SerializableBlock[];
}
const ArticlePage = (props: PropsWithChildren<ArticlePageProps>) => {
  const {user} = useAuth();
  return (
    <>
      <Nav />
      <Container maxW={"full"} p="4">
      <Breadcrumb>
          <BreadcrumbItem paddingBottom={"4"}>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{props.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading size={"md"}>{props.heading}</Heading>
        <HStack px={{base:'0',md:'14'}}>
        <RichTextEditor 
          debug={user?.role === UserRole.ADMIN} treeGrabber={()=>{}} 
          init={{
            readonly: user?(user.role !== UserRole.ADMIN):true
          }}
          blocklist={props.blocks as SerializableBlock[]}/>
        </HStack>
        {props.children}
      </Container>
      <Footer />
    </>
  );
};

export default ArticlePage;
