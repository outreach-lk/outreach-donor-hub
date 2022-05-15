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
import { TimelineEvent } from "../../elements/timeline/timeline-event";
import { EntityListPage } from "../../layouts/pages/entity/entity.list.layout";

interface TimelineProps {
  title: string;
  topic: string;
}

export function EventTimeline(props: TimelineProps) {
  const [hideDonations, setHideDonations] = useState(true);
  const [hideExpenses, setHideExpenses] = useState(false);

  const _map = new Map<string, string>();
  _map.set("topic", props.topic);

  return (
    <Box minW={"full"}>
      <Flex>
        <Heading size={"md"}>{props.title}</Heading>
        <HStack ml="4" direction={"row"} align="baseline">
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
        <FormControl>
          <Switch
            id="hideExpenses"
            onChange={(e) => {
              setHideExpenses(!e.target.checked);
            }}
            checked={!hideExpenses}
            defaultChecked={!hideExpenses}
          />
          <FormHelperText>{hideExpenses?'Expenses are hidden':'Expenses are shown'}</FormHelperText>
        </FormControl>
        </HStack>
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
            if (data.eventType.match("expense") && hideExpenses) {
              return null;
            }
            return <TimelineEvent key={data.id} {...data} />;
          }}
        </EntityListPage>
      </VStack>
    </Box>
  );
}
