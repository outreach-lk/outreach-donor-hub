import { Icon } from "@chakra-ui/react";
import { FaBell, FaCheck, FaDatabase, FaDonate } from "react-icons/fa";
import { GoMilestone } from "react-icons/go";
import { MdOutlineQueue, MdPostAdd, MdVerified } from "react-icons/md";
import { EventType } from "../../../../types/enums/events";

interface TimelineEventIconProps {
  type: EventType;
}
export function TimelineEventIcon(props: TimelineEventIconProps) {
  switch (props.type) {
    case EventType.CAUSE_CREATED:
      return <MdPostAdd />;
    case EventType.CAUSE_QUEUED:
      return <MdOutlineQueue />;
    case EventType.CAUSE_VERIFIED:
      return <MdVerified />;
    case EventType.DONATION_CLAIM_CREATED:
      return <FaDonate />;
    case EventType.DONATION_CLAIM_ACKNOWLEDGED:
      return <FaDonate />
      case EventType.DONATION_CLAIM_DECLINED:
        return <FaDonate  color="red"/>
    case EventType.CAUSE_MILESTONE_CREATED:
      return <GoMilestone/>
    default:
      return <FaBell />;
  }
}
