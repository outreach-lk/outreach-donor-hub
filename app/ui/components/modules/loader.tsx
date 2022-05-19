/**
 * Full Screen Loader for Route Switching.
 * @kulathilake
 */

import { VStack,useColorModeValue, Spacer, Heading, Flex, Box } from "@chakra-ui/react";
import { Logo } from "../elements/branding/Logo";
import { CenteredLayout } from "../layouts/pages/centred.layout";

export const FullScreenLoader = () => {
  const color = useColorModeValue('#0077B5','#90cdf4');
  return <CenteredLayout>
    <VStack opacity={"0.8"}>
    <Flex>
    <Logo withTitle={true} />
    </Flex>
    <div className="loader" style={{color}}></div>
    </VStack>
  </CenteredLayout>
};
