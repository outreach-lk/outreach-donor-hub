import { BellIcon } from "@chakra-ui/icons";
import { Avatar, Box, Divider, Heading, Stack, Stat, Text } from "@chakra-ui/react";

export function TimelineEvent() {
  /**
   * returns icon element based on event type
   */  
  const getIcon= () => {
    return <BellIcon/>
  }  
  return (
      <Stack direction="row" h="100px" p={4}>
        <Avatar icon={getIcon()}/>
        <Divider orientation="vertical" />
        <Box
            overflow={"clip"}
        >
        <Heading size={"sm"}>Created</Heading>
        <Text>23.02.2022</Text>
        <Text>The VStack component is a component which is only facing the vertd a divider and vertical spacing between the items.</Text>
        </Box>
      </Stack>
  );
}
