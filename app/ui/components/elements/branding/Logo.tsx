import { chakra, HTMLChakraProps, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaDonate } from 'react-icons/fa'

export const Logo = (props: HTMLChakraProps<'svg'>) => (
  <Icon 
  color={useColorModeValue('blue.500', 'blue.200')}
  fontSize="2xl"
  >
    <FaDonate  />
  </Icon>
)
