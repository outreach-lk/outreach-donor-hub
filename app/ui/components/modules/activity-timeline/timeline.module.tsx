import { Box, Stack, Text, VStack } from '@chakra-ui/react';
import { TimelineEvent } from '../../elements/timeline/timeline-event';

export function Timeline(){
    return (
        <VStack alignItems={"center"}>
            <TimelineEvent></TimelineEvent>
            <TimelineEvent></TimelineEvent>
            <TimelineEvent></TimelineEvent>
        </VStack>
    )
}