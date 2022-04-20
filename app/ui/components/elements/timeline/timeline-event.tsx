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
    <Box>
      <Stack direction="row" h="100px" p={4}>
        <Avatar icon={getIcon()}/>
        <Divider orientation="vertical" />
        <Box>
        <Heading size={"sm"}>Created</Heading>
        <Text>23.02.2022</Text>
        </Box>
      </Stack>
    </Box>
  );
}
