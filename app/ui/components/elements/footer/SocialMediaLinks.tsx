import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react'
import * as React from 'react'
import { FaFacebook, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'

export const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton colorScheme={"facebook"} as="a" href="#" aria-label="LinkedIn" icon={<FaFacebook fontSize="20px" />} />
    <IconButton colorScheme={"twitter"} as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} />
    <IconButton colorScheme={"red"} as="a" href="#" aria-label="GitHub" icon={<FaYoutube fontSize="20px" />} />
  </ButtonGroup>
)