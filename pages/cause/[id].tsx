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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { IconBase } from "react-icons/lib";
import Cause from "../../app/data/entities/cause.entity";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { AttachmentCarousel } from "../../app/ui/components/elements/carousel";
import { CauseActions } from "../../app/ui/components/elements/cause/cause.actions";
import { CauseStats } from "../../app/ui/components/elements/cause/cause.stats";
import { EntityPage } from "../../app/ui/components/layouts/pages/entity/entity.layout";
import { EventTimeline } from "../../app/ui/components/modules/activity-timeline/timeline.module";
import { RichTextEditor } from "../../app/ui/components/modules/wyswyg-editor";

export default function CausePage() {
  const { query } = useRouter();
  return (
    <EntityPage entity="cause" id={query.id as string}>
      {(data: CauseDto) => {
        const cause = new Cause(data);
        return (
          <>
            <Container maxW={"7xl"} p="12">
              <HStack align={"baseline"}>
                <Heading marginTop="1">{data.title}</Heading>
                {/* TODO: make own element */}
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
                  flex="1"
                  flexDirection="column"
                  justifyContent={"center"}
                  alignItems={{ md: "flex-end", sm: "self-end" }}
                  marginTop={{ base: "3", sm: "0" }}
                >
                  <CauseStats amount={100} currency="LKR" target={10000} />
                  <CauseActions cause={cause} />
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
  );
}
