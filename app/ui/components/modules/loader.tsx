/**
 * Full Screen Loader for Route Switching.
 * @kulathilake
 */

import { VStack } from "@chakra-ui/react";
import { Logo } from "../elements/branding/Logo";
import { CenteredLayout } from "../layouts/pages/centred.layout";

export const FullScreenLoader = () => (
  <CenteredLayout>
    <VStack>
      <Logo />
      <span className="loader"></span>
    </VStack>
  </CenteredLayout>
);
