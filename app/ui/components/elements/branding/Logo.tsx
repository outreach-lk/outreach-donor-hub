import { chakra, Heading, HStack, HTMLChakraProps, Icon, Image, useColorModeValue } from '@chakra-ui/react'
import { FaDonate } from 'react-icons/fa'
import { getConfig } from '../../../../config'

export const Logo = (props: HTMLChakraProps<'svg'> & {withTitle?:boolean}) => {
  const {title} = getConfig();

return (
  <HStack>
    <Image src={useColorModeValue("/assets/logo/logo.svg","/assets/logo/logo-dark.svg")} width={"60px"}/>
    {props.withTitle&&<Heading color={useColorModeValue('blue.500', 'blue.200')}>{title}</Heading>}
  </HStack>
)
}
