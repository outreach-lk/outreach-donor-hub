/**
 * Cause Edit Form
 * TODO: Move this to a General Stepped Form Module
 */
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Spacer,
  useBreakpoint,
} from "@chakra-ui/react";
import { wrap } from "module";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { CauseGeneralForm } from "../../elements/cause/cause-general-form";

export function CauseEditModule() {
    const {show} = useFeedback();

  /**
   * set to true if an existing cause is being edited.
   */
  const [isEditing, setIsEditing] = useState<boolean>(false);
  /**
   * current step of the edit / create process
   */
  const [step, setStep] = useState<CauseEditStep>(CauseEditStep.GENERAL);
  /**
   *
   */
  const [stepMap, setStepMap] = useState(StepMap);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const TOTALSTEPS = Object.keys(StepMap).length;
  /**
   * callback for general details form.
   * @param title
   * @param description
   * @param attachments
   */
  const onCauseGeneralContinue = (
    title: string,
    description: string,
    attachments: FileDto[]
  ) => {
    StepMap[step].isComplete = true;
    setStepMap(StepMap);
    stepNext();
  };

  const onCauseGoalContinue = () => {};
  const onCauseBankContinue = () => {};
  const onCauseLegalContinue = () => {};
  const onCauseUserVeriContinue = () => {};

  const stepNext = () => {
    if (stepMap[step].next) {
      setStep(stepMap[step].next || step);
    } else {
      setIsFinish(true);
    }
  };

  const stepPrev = () => {
    if (stepMap[step].prev) {
      setStep(stepMap[step].prev || step);
    }
  };

  const goToStep = (nextStep: CauseEditStep) => {
    if(nextStep === step) {
        return;
    }  
    if (
      (stepMap[step].isComplete &&
        (!stepMap[nextStep].prev ||
          stepMap[stepMap[nextStep].prev as CauseEditStep].isComplete)) ||
      stepMap[nextStep].index < stepMap[step].index
    ) {
      setStep(nextStep);
    } else {
      //   show toast
        show(`Please complete step: ${stepMap[step].label}`,{
            type: 'warning'
        })
    }
  };

  return (
    <Box>
      <Flex p="12">
        <Box w={"20%"}>
          <Flex direction="column">
            <Heading size={"sm"}>
              Step {stepMap[step].index} of {TOTALSTEPS}
            </Heading>
            <List py="4">
              {stepMap &&
                Object.entries(stepMap)
                  .sort((s1, s2) => (s1[1].index > s2[1].index ? 1 : -1))
                  .map(([key, step], i) => (
                    <ListItem key={i} onClick={() => goToStep(key as CauseEditStep)}>
                      <ListIcon
                        as={FaCheckCircle}
                        color={step.isComplete ? "green.400" : "gray.300"}
                      ></ListIcon>
                      <Link>{step.label}</Link>
                    </ListItem>
                  ))}
            </List>
          </Flex>
        </Box>
        <Spacer />
        <Box w={"80%"}>
          {step === CauseEditStep.GENERAL && (
            <CauseGeneralForm onContinue={onCauseGeneralContinue} />
          )}
        </Box>
      </Flex>
    </Box>
  );
}

enum CauseEditStep {
  GENERAL = "GENERAL",
  BANKDETAILS = "BANKDETAILS",
  GOALDETAILS = "GOALDETAILS",
  USERVERIFICATION = "USERVERIFICATION",
  LEGAL = "LEGAL",
}
const StepMap = {
  [CauseEditStep.GENERAL]: {
    index: 1,
    label: "General",
    prev: null,
    next: CauseEditStep.GOALDETAILS,
    isComplete: false,
  },
  [CauseEditStep.GOALDETAILS]: {
    index: 2,
    label: "Donation Goals",
    prev: CauseEditStep.GENERAL,
    next: CauseEditStep.BANKDETAILS,
    isComplete: false,
  },
  [CauseEditStep.BANKDETAILS]: {
    index: 3,
    label: "Bank Details",
    prev: CauseEditStep.GOALDETAILS,
    next: CauseEditStep.LEGAL,
    isComplete: false,
  },
  [CauseEditStep.LEGAL]: {
    index: 4,
    label: "Legal",
    prev: CauseEditStep.BANKDETAILS,
    next: CauseEditStep.USERVERIFICATION,
    isComplete: false,
  },
  [CauseEditStep.USERVERIFICATION]: {
    index: 5,
    label: "User Verification",
    prev: CauseEditStep.LEGAL,
    next: null,
    isComplete: false,
  },
};
