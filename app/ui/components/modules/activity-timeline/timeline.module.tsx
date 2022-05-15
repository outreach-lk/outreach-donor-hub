import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EventDto } from "../../../../types/dtos/event.dtos";
import { TimelineEvent } from "../../elements/timeline/timeline-event";
import { EntityListPage } from "../../layouts/pages/entity/entity.list.layout";

interface TimelineProps {
  title: string;
  topic: string;
}

export function EventTimeline(props: TimelineProps) {
  const [hideDonations, setHideDonations] = useState(true);
  const _map = new Map<string, string>();
  _map.set("topic", props.topic);

  return (
    <Box minW={"full"}>
      <Flex>
        <Heading size={"md"}>{props.title}</Heading>
        <FormControl>
          <Switch
            id="hideDonations"
            onChange={(e) => {
              setHideDonations(!e.target.checked);
            }}
            checked={!hideDonations}
            defaultChecked={!hideDonations}
          />
          <FormHelperText>{hideDonations?'Donations are hidden':'Donations are shown'}</FormHelperText>
        </FormControl>
      </Flex>
      <VStack alignItems={"center"}>
        <EntityListPage
          entity="event"
          query={_map}
          isEmbedded={true}
          width="full"
        >
          {(data: EventDto) => {
            if (data.eventType.match("donation") && hideDonations) {
              return null;
            }
            return <TimelineEvent key={data.id} {...data} />;
          }}
        </EntityListPage>
      </VStack>
    </Box>
  );
}
