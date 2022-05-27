import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Stack,
  Switch,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EventDto } from "../../../../types/dtos/event.dtos";
import { EventType } from "../../../../types/enums/events";
import { getMultipleValuesFromArray } from "../../../../utils/parse-querystring";
import { TimelineEvent } from "../../elements/timeline/timeline-event";
import { EntityListPage } from "../../layouts/pages/entity/entity.list.layout";

interface TimelineProps {
  topic: string;
  events: EventType | EventType[]
}

export function EventTimeline(props: TimelineProps) {
  const _map = new Map<string, string>();
  _map.set("topic", props.topic);
  _map.set("eventType",getMultipleValuesFromArray(props.events))
  const [map,setMap] = useState(_map);
  return (
    <Box minW={"full"}>
      <VStack alignItems={"center"}>
        <EntityListPage
          entity="event"
          query={map}
          isEmbedded={true}
          width="full"
          showFullScreenLoader={true}
        >
          {(data: EventDto) => {
            return <TimelineEvent key={data.id} {...data} />;
          }}
        </EntityListPage>
      </VStack>
    </Box>
  );
}
