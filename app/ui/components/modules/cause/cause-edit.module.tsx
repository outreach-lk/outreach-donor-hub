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
import { CauseDto } from "../../../../types/dtos/cause.dtos";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { Currency } from "../../../../types/enums/currency";
import { CauseGeneralForm } from "../../elements/cause/cause-general-form";
import { BlockAlignment, BlockType, SerializableBlock } from "../wyswyg-editor";

export function CauseEditModule() {
  const { show } = useFeedback();

  /**
   * set to true if an existing cause is being edited.
   */
  const [isEditing, setIsEditing] = useState<boolean>(false);
  /**
   * current step of the edit / create process
   */
  const [step, setStep] = useState<CauseEditStep>(CauseEditStep.GENERAL);
  /**
   * step progress map
   */
  const [stepMap, setStepMap] = useState(StepMap);
  /**
   * is form ready for final submission?
   */
  const [isFinish, setIsFinish] = useState<boolean>(false);
  /**
   * Total number of steps in thre process
   */
  const TOTALSTEPS = Object.keys(StepMap).length;
  /**
   * a holder to keep the details which will finally be used to create the cause
   */
  const [data, setData] = useState<CauseDto>({} as CauseDto);
  /**
   * callback for general details form.
   * @param title
   * @param description
   * @param attachments
   */
  const onCauseGeneralContinue = (
    title: string,
    description: SerializableBlock[],
    attachments: FileDto[]
  ) => {
    // check if title is valid and description has atleast some blocks with non zero raw values
    if (title?.length && description?.some((block) => block.rawValue?.length)) {
      setData({
        ...data,
        title,
        description,
        attachments,
      });
      setStepStatus();
    } else {
      show("Title & Description are required", {
        type: "error",
      });
    }
  };

  /**
   * Optional Cause goal details.
   * @param target target amount expected to collect
   * @param currency currency of target
   * @param expiry date by which the donation will cease collecting funds
   */
  const onCauseGoalContinue = (
    target?: number,
    currency?: Currency,
    expiry?: Date
  ) => {
    setData({
      ...data,
      target,
      currency,
      expiry,
    });
    setStepStatus();
  };
  const onCauseBankContinue = () => {};
  const onCauseLegalContinue = () => {};
  const onCauseUserVeriContinue = () => {};

  /**
   * updates the stepMap and progresses to next step
   */
  const setStepStatus = () => {
    StepMap[step].isComplete = true;
    setStepMap(StepMap);
    stepNext();
  };

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
    if (nextStep === step) {
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
      show(`Please complete step: ${stepMap[step].label}`, {
        type: "warning",
      });
    }
  };

  // Helpers
  const getBlockListFromDto = ():SerializableBlock[] | null =>{
    if(data?.title && data?.description){
      return [
        {
          "id": "new.cause.title",
          "type": "h1" as BlockType,
          "placeholder": "👋 Title of the Cause <small>[edit]</small>",
          "blockAlignment": "left" as BlockAlignment,
          "rawValue": data.title,
          "nextBlockId": "new.cause.desc.block.1",
          "hideMenu": true,
          "nonZeroRawValueRequired": true
        },
        ...data.description
      ]
    } else {
      return null
    }
  }

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
                  .map(([key, _step], i) => (
                    <ListItem
                      key={i}
                      onClick={() => goToStep(key as CauseEditStep)}
                    >
                      <ListIcon
                        as={FaCheckCircle}
                        color={_step.isComplete ? "green.400" : key===step? "orange.300" :"gray.300"}
                      ></ListIcon>
                      <Link>{_step.label}</Link>
                    </ListItem>
                  ))}
            </List>
          </Flex>
        </Box>
        <Spacer />
        <Box w={"80%"}>
          {step === CauseEditStep.GENERAL && (
            <CauseGeneralForm 
              onContinue={onCauseGeneralContinue} 
              blockList={getBlockListFromDto()}
              />
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
