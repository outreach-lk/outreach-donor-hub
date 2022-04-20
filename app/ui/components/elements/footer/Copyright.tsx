import { Text, TextProps } from '@chakra-ui/react'
import * as React from 'react'

export const Copyright = (props: TextProps) => (
  <Text fontSize="sm" {...props}>
    {/* TODO: find an appropriate copyright message */}
    &copy; {new Date().getFullYear()} Outreach DonorHub, Outreach.lk
  </Text>
)

