/**
 * Cause Page
 */

import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IconBase } from "react-icons/lib";
import Cause from "../../app/data/entities/cause.entity";
import CauseRepo from "../../app/data/repos/cause.repo";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { AttachmentCarousel } from "../../app/ui/components/elements/carousel";
import { CauseActions } from "../../app/ui/components/elements/cause/cause.actions";
import { CauseStats } from "../../app/ui/components/elements/cause/cause.stats";
import { EntityVerifiedBanner } from "../../app/ui/components/elements/entity-verified-banner";
import { EntityPage } from "../../app/ui/components/layouts/pages/entity/entity.layout";
import { EventTimeline } from "../../app/ui/components/modules/activity-timeline/timeline.module";
import { Footer } from "../../app/ui/components/modules/Footer";
import { Nav } from "../../app/ui/components/modules/Navigation";
import { RichTextEditor } from "../../app/ui/components/modules/wyswyg-editor";

export default function CausePage(props: { 
  cause: CauseDto
  og: {
    title: string,
    image: string,
    description: string
  }
}) {
  const { query } = useRouter();
  const { cause } = props;
  return (
    <div>
      <Head>
        <title>{cause.title}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Outreachlka" />
        <meta name="twitter:title" content={props.og.title} />
        <meta name="twitter:description" content={props.og.description} />
        <meta name="twitter:image" content={props.og.image} />
        <meta name="description" content={props.og.description} />
        <meta property="og:title" content={props.og.title} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={props.og.image} />
      </Head>
      <Nav />
      <Container minW={"full"}
       bg={useColorModeValue("gray.200", "auto")}
      >
        <EntityPage
          entity="cause"
          id={cause.id as string}
          serverFetchedData={props.cause}
        >
          {(entityProps) => {
            const data: CauseDto = entityProps.data;
            const cause = new Cause(data);
            return (
              <>
                <Container maxW={"7xl"} p="4">
                  <VStack align={"baseline"}>
                    <Heading marginTop="1">{data.title}</Heading>
                    <EntityVerifiedBanner
                       isVerified={Boolean(data.isVerified)} 
                       entity="Campaign" 
                       tooltip={{
                         verified: "This campaign has been Verified by DonorHub Mods.",
                         unverified: "This campaign has not been verified by DonorHub Mods."
                       }}
                    />
                  </VStack>
                  <Box
                    marginTop={{ base: "1", sm: "5" }}
                    display="flex"
                    flexDirection={{ base: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={"start"}
                  >
                    {/* Attachments & Description  */}
                    <Box
                      display="flex"
                      width={{ base: "100%", sm: "85%" }}
                      flexDirection="row"
                      justifyContent="center"
                      marginTop={{ base: "3", sm: "0" }}
                    >
                      {/* {data.description} */}
                      <Box>
                        <RichTextEditor
                          treeGrabber={(tree) => {
                            console.log(tree);
                          }}
                          blocklist={data.description}
                          init={{
                            hideMenu: true,
                            readonly: true,
                          }}
                        />
                      </Box>
                      {/* {data.attachments&&
                    // <AttachmentCarousel files={data.attachments}/>
                  } */}
                    </Box>
                    {/* Cause Stats  */}
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent={"center"}
                      // // alignItems={{ md: "flex-end", sm: "self-end" }}
                      marginTop={{ base: "3", sm: "0" }}
                    >
                      <CauseStats
                        currentCollection={cause.currentCollection}
                        expenses={cause.expenses}
                        currency="LKR"
                        target={cause.target || 0}
                      />
                      <CauseActions
                        cause={cause}
                        forceRefresh={entityProps.forceRefresh}
                      />
                    </Box>
                  </Box>
                  {/* Cause Activity */}
                  <Box
                    marginTop={{ base: "10", md: "1" }}
                    display="flex"
                    flexDirection={{ base: "column", sm: "row" }}
                    justifyContent="space-between"
                    flexWrap={"wrap"}
                  >
                    <EventTimeline
                      title="Campaign Activity"
                      topic={data.id as string}
                    />
                  </Box>
                  {/* Similar Causes */}
                </Container>
              </>
            );
          }}
        </EntityPage>
      </Container>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { id } = context.query;
    const { data } = await CauseRepo.getRepo().get(("cause-" + id) as string);
    console.log(data);
    return {
      props: {
        cause: JSON.parse(JSON.stringify(data)),
        og: {
          title: data?.title,
          description: data?.title,
          image: data?.attachments.find(at=>at?.path)
        }
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/404",
        permanent: true,
      },
    };
  }
}
