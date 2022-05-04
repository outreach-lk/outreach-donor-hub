/**
 * Cause Page
 */

import {
  Box,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { AttachmentCarousel } from "../../app/ui/components/elements/carousel";
import { CauseActions } from "../../app/ui/components/elements/cause/cause.actions";
import { CauseStats } from "../../app/ui/components/elements/cause/cause.stats";
import { EntityPage } from "../../app/ui/components/layouts/pages/entity/entity.layout";
import { Timeline } from "../../app/ui/components/modules/activity-timeline/timeline.module";
import { RichTextEditor } from "../../app/ui/components/modules/wyswyg-editor";

export default function CausePage() {
  const { query } = useRouter();
  return (
    <EntityPage entity="cause" id={query.id as string}>
      {(data: CauseDto) => {
        return (
          <>
            <Container maxW={"7xl"} p="12">
              <Heading marginTop="1">{data.title}</Heading>
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
                      treeGrabber={(tree)=>{console.log(tree)}}
                      blocklist={data.description}
                      init={{
                        hideMenu: true
                      }}
                    />
                    </Box>
                  {data.attachments&&
                    <AttachmentCarousel files={data.attachments}/>
                  }
                </Box>
                {/* Cause Stats  */}
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent={"center"}
                  alignItems={{ md: "flex-end", sm: "self-end" }}
                  marginTop={{ base: "3", sm: "0" }}
                >
                  <CauseStats amount={100} currency="LKR" target={10000} />
                  <CauseActions />
                </Box>
              </Box>
              {/* Cause Activity */}
              <Box
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
                flexWrap={"wrap"}
              >
                <Timeline title="Campaign Activity"/>
              </Box>
              {/* Similar Causes */}
            </Container>
          </>
        );
      }}
    </EntityPage>
  );
}
