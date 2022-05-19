import { chakra, Heading, HStack, HTMLChakraProps, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaDonate } from 'react-icons/fa'
import { getConfig } from '../../../../config'

export const Logo = (props: HTMLChakraProps<'svg'> & {withTitle?:boolean}) => {
  const {title} = getConfig();
return (
  <HStack>
  <Icon 
  color={useColorModeValue('blue.500', 'blue.200')}
  fontSize="2xl"
  >
    <FaDonate  />
  </Icon>
    {props.withTitle&&<Heading color={useColorModeValue('blue.500', 'blue.200')}>{title}</Heading>}
  </HStack>
)
}
