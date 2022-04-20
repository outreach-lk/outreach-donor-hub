import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react';
import { TimelineEvent } from '../../elements/timeline/timeline-event';

export function Timeline(){
    return (
        <VStack alignItems={"center"}>
            <TimelineEvent></TimelineEvent>
            <TimelineEvent></TimelineEvent>
            <TimelineEvent></TimelineEvent>
            <Button colorScheme={"blue"}>Load More</Button>
            {/* Creation Event will always show */}
            <TimelineEvent></TimelineEvent>
        </VStack>
    )
}