import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Stack,
  useBreakpointValue,
  useColorModeValue as mode,
} from "@chakra-ui/react";

import { Footer } from "../../app/ui/components/modules/Footer";
import { Nav } from "../../app/ui/components/modules/Navigation";
import { useEntity } from "../../app/hooks/entity";
import { CauseDto } from "../../app/types/dtos/cause.dtos";
import { FaQuestionCircle } from "react-icons/fa";
import { CauseEditModule } from "../../app/ui/components/modules/cause/cause-edit.module";
export default function NewCausePage() {
  const { createEntity } = useEntity("cause");
  const dto: CauseDto = {} as CauseDto;

  return (
    <>
      <Nav />
      <Container maxW={"full"} py="12">
        <HStack>
          <Stack>
          <Heading size={"md"}>Create a new Donation Campaign</Heading>
          <Heading size={"sm"}>And let the donors know!</Heading>
          </Stack>
          <IconButton 
              aria-label="create-cause-info"
              icon={
                  <FaQuestionCircle/>
              }
          />
          </HStack>
          <CauseEditModule/>
      </Container>
      <Footer />
    </>
  );
}
