import { Box, Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { TimelineEvent } from "../../elements/timeline/timeline-event";

interface TimelineProps  {
  title: string;
}

export function Timeline(props: TimelineProps) {
  return (
    <Box>
      <Heading size={"md"}>{props.title}</Heading>
      <VStack alignItems={"center"}>
      <TimelineEvent></TimelineEvent>
      <TimelineEvent></TimelineEvent>
      <TimelineEvent></TimelineEvent>
      <Button colorScheme={"blue"}>Load More</Button>
      {/* Creation Event will always show */}
      <TimelineEvent></TimelineEvent>
      </VStack>
    </Box>
  );
}
