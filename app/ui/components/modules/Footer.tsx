import { EmailIcon, ExternalLinkIcon, WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Link,
  Stack,
  useColorModeValue,
  Text,
  Wrap,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import { GitHubIcon } from "../elements/auth/ProviderIcons";
import { Logo } from "../elements/branding/Logo";
import { Copyright } from "../elements/footer/Copyright";
import { NewsLetterSubscribe } from "../elements/footer/NewsletterSub";
import { SocialMediaLinks } from "../elements/footer/SocialMediaLinks";

export const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="0"
    py={"12"}
    px={{ base: "4", md: "8" }}
    pb={"4"}
    bg={useColorModeValue("gray.100", "gray.900")}
  >
    <Stack>
      <Wrap
        direction={{ base: "row", xs: "column" }}
        spacing="4"
        align="flex-start"
        justify="space-between"
      >
        <Stack direction={"column"}>
          <Wrap align={"center"}>
            <Logo /> <Heading size="lg">DonorHub</Heading>
          </Wrap>
          <SocialMediaLinks />
        </Stack>
        {/* DonorHub Column */}
        <Stack direction={"column"}>
          <Heading size={"md"}>DonorHub</Heading>
          <Link>Become a Moderator</Link>
          <Link>Donate to DonorHub</Link>
          <Link>Help &amp; Support</Link>
          <Link>Site Map </Link>
          <Link>
            {" "}
            outreach.lk <ExternalLinkIcon />
          </Link>
        </Stack>
        {/* Legal Column */}
        <Stack direction={"column"}>
          <Heading size={"md"}>Legal</Heading>
          <Link>Disclaimer </Link>
          <Link>Report Fraudalant Activity </Link>
          <Link>Terms of Use </Link>
          <Link>Privacy Policy </Link>
        </Stack>
        {/* Developer Column */}
        <Stack direction={"column"}>
          <Heading size={"md"}>Developers</Heading>
          <Link>
            <GitHubIcon /> Github <ExternalLinkIcon />
          </Link>
          <Link>Contribute</Link>
          <Link>
            {" "}
            Report Issues <ExternalLinkIcon />
          </Link>
          <Link>Self Host Guide</Link>
          <Link>Service Status</Link>
          <Link>
            License <ExternalLinkIcon />
          </Link>
        </Stack>
        {/* <Stack direction={"column"}>
          <Heading size={"md"}>Outreach</Heading>
          <Link> outreach.lk <ExternalLinkIcon/></Link>
          <Link> hello@outreach.lk <ExternalLinkIcon/></Link>
        </Stack> */}
        <NewsLetterSubscribe />
      </Wrap>
      <Stack direction={"row"} justify="center">
        <Copyright alignSelf={{ base: "center", sm: "start" }} />
      </Stack>
    </Stack>
  </Box>
);
