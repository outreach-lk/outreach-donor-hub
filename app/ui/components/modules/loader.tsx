/**
 * Full Screen Loader for Route Switching.
 * @kulathilake
 */

import { VStack,useColorModeValue, Spacer } from "@chakra-ui/react";
import { Logo } from "../elements/branding/Logo";
import { CenteredLayout } from "../layouts/pages/centred.layout";

export const FullScreenLoader = () => {
  const color = useColorModeValue('#0077B5','#90cdf4');
  return <CenteredLayout>
    <VStack>
      <Logo />
      <Spacer/>
      <div className="loader" style={{color}}></div>
    </VStack>
  </CenteredLayout>
};
