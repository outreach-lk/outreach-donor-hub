import { BellIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  Heading,
  Stack,
  Stat,
  Text,
} from "@chakra-ui/react";
import { AuditableEventDto, EventDto } from "../../../../types/dtos/event.dtos";
import { getDateFromFirebaseDateTimeObject } from "../../../../utils/date-time";
import { eventHeadings } from "../../../../utils/timeline_event_headings";
import { TimelineEventIcon } from "./timeline-event-icon";

export function TimelineEvent(props: AuditableEventDto) {

  return (
    <Stack direction="row" h="100px" p={4}>
      <Avatar icon={<TimelineEventIcon type={props.eventType} />} />
      <Divider orientation="vertical" />
      <Box overflow={"clip"}>
        <Heading size={"sm"}>{eventHeadings(props.eventType)}</Heading>
        <Text>
          {getDateFromFirebaseDateTimeObject(
            props.createdOn as any
          )?.toLocaleDateString()}
        </Text>
        <Text>{props.message}</Text>
      </Box>
    </Stack>
  );
}
