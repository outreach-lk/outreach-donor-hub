import { Box, Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EventDto } from "../../../../types/dtos/event.dtos";
import { TimelineEvent } from "../../elements/timeline/timeline-event";
import { EntityListPage } from "../../layouts/pages/entity/entity.list.layout";

interface TimelineProps {
  title: string;
  topic: string;
}

export function EventTimeline(props: TimelineProps) {
  const _map = new Map<string, string>();
  _map.set("topic", props.topic);

  return (
    <Box>
      <Heading size={"md"}>{props.title}</Heading>
      <VStack alignItems={"center"}>
        <EntityListPage entity="event" query={_map} isEmbedded={true}>
          {(data: EventDto) => <TimelineEvent {...data} />}
        </EntityListPage>
      </VStack>
    </Box>
  );
}
