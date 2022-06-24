import { BellIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Stat,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaReadme } from "react-icons/fa";
import { GoMilestone } from "react-icons/go";
import { MdReadMore } from "react-icons/md";
import { AuditableEventDto, EventDto } from "../../../../types/dtos/event.dtos";
import { getDateFromFirebaseDateTimeObject } from "../../../../utils/date-time";
import { eventHeadings } from "../../../../utils/timeline_event_headings";
import { RichTextEditor, SerializableBlock } from "../../modules/wyswyg-editor";
import { TimelineEventIcon } from "./timeline-event-icon";

export function TimelineEvent(props: AuditableEventDto & {minimized?:boolean}) {
  const shouldShowRichTextEditor =
    !!props.payload?.description && Array.isArray(props.payload.description);
  const {
    isOpen: isReadmoreOpen,
    onOpen: onReadMoreOpen,
    onClose: onReadMoreClose,
  } = useDisclosure();

  return (
    <>
      <Stack direction="row" h={{base:'auto', sm:props.minimized?"80px":"120px"}} width={"full"} 
        opacity={props.minimized?"0.3":'auto'}
      >
        <Avatar
          color={'gold'}
          background={useColorModeValue("facebook.400", "facebook.800")}
          icon={<TimelineEventIcon type={props.eventType} />}
        />
        <Divider orientation="vertical" />
      <Box overflow={"scroll"} pb="12">
          <Box>
            <Heading size={"sm"}>{props.message}</Heading>
            <Text>
              {getDateFromFirebaseDateTimeObject(
                props.createdOn as any
              )?.toLocaleDateString()}
            </Text>
            <Text>
              {eventHeadings(props.eventType) + " "}
              {shouldShowRichTextEditor && (
                <>
                  <Button
                    variant={"link"}
                    leftIcon={<MdReadMore />}
                    onClick={onReadMoreOpen}
                  >
                    {" "}
                    Read More{" "}
                  </Button>
                  {isReadmoreOpen&&<TimelineEventReadMore
                    blocks={props.payload.description}
                    title={props.message}
                    isOpen={isReadmoreOpen}
                    onClose={onReadMoreClose}
                  />}
                </>
              )}
            </Text>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

function TimelineEventReadMore(props: {
  blocks: SerializableBlock[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
          <GoMilestone /> 
          <Heading>{props.title}</Heading>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <RichTextEditor
                  treeGrabber={(tree) => {
                    console.log(tree);
                  }}
                  blocklist={props.blocks}
                  init={{
                    hideMenu: true,
                    readonly: true,
                  }}
                    />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
