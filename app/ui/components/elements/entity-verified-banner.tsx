import { CheckCircleIcon } from "@chakra-ui/icons"
import { chakra,Badge, Tooltip, Flex, useColorModeValue } from "@chakra-ui/react"
import Cause from "../../../data/entities/cause.entity"

interface EntityVerifiedBannerProps {
    isVerified: boolean
    entity: string,
    tooltip: {
      verified: string,
      unverified: string
    }

}
export function EntityVerifiedBanner(props: EntityVerifiedBannerProps){
    return (
      <Flex>
          <Tooltip
          label={
            props.isVerified
              ? props.tooltip.verified
              : props.tooltip.unverified
          }
        >
          <Badge colorScheme={props.isVerified?"linkedin":"gray"} size="lg">
            <chakra.span>
              {props.isVerified?'Verified':'Unverified'} {props.entity}
            </chakra.span>
            <chakra.span ml="2" alignSelf={"baseline"}>
              <CheckCircleIcon color={props.isVerified?"linkedin.600":"gray"}/>
            </chakra.span>
            </Badge>
        </Tooltip>
      </Flex>
    )
}