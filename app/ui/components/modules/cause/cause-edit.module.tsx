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
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useFeedback } from "../../../../hooks/feedback.hook";
import { BankAccountDetails } from "../../../../types/dtos/bank-details.dto";
import { CauseDto } from "../../../../types/dtos/cause.dtos";
import { FileDto } from "../../../../types/dtos/remote-file.dtos";
import { Currency } from "../../../../types/enums/currency";
import { BankAccountDetailForm } from "../../elements/bank-account-detail-form";
import { CauseGeneralForm } from "../../elements/cause/cause-general-form";
import { CauseGoalsForm } from "../../elements/cause/cause-goals-form";
import { CauseLegalForm } from "../../elements/cause/cause-legal-form";
import { Consent } from "../../../../types/dtos/consent";
import { BlockAlignment, BlockType, SerializableBlock } from "../wyswyg-editor";
import { CauseVerificationForm } from "../../elements/cause/cause-verification-form";
import Cause from "../../../../data/entities/cause.entity";
import { useEntity } from "../../../../hooks/entity";
import { FileStorageProvider } from "../../../../types/enums/providers";
import { EventTimeline } from "../activity-timeline/timeline.module";
import Router from "next/router";

export function CauseEditModule(props: {cause?: CauseDto, callback?: ()=>void}) {
  const { show } = useFeedback();
  const { createEntity,updateEntity } = useEntity("cause");
  /**
   * set to true if an existing cause is being edited.
   */
  const [isEditing, setIsEditing] = useState<boolean>(!!props.cause);
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
  const [data, setData] = useState<CauseDto>(props.cause || {} as CauseDto);
  /**
   * intermediate state for submission in progress
   */
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
      const _attachments = [
        ...attachments,
        ...description.map((block) => {
          if (block.media?.src) {
            return {
              provider: FileStorageProvider.FIRESTORAGE,
              path: block.media?.src,
            } as FileDto;
          }
        }),
      ];
      setData({
        ...data,
        title,
        description,
        attachments: _attachments as FileDto[],
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
  /**
   * cause bank detail form callback
   * @param bankAccount
   */
  const onCauseBankContinue = (bankAccount: BankAccountDetails) => {
    setData({
      ...data,
      bankAccount,
    });
    setStepStatus();
  };
  /**
   * cause consent form callback
   * @param consent
   */
  const onCauseLegalContinue = (consent: Consent) => {
    setData({
      ...data,
      ownersConsent: consent,
    });
    if (consent.iConsent) {
      setStepStatus();
    } else {
      show(
        "You have not consented to continue. You cannot proceed unless you do.",
        {
          type: "info",
          title: "Legal Consent",
        }
      );
    }
  };

  /**
   * callback for when the user submits
   * the cause for verification
   */
  const onSubmitToVerify = () => {
    let job: Promise<any>
    setIsSubmitting(true);
    if (isEditing && (data as any)._id) {
      job = updateEntity((data as any)._id, data);
    } else {
      job = createEntity(data)
    }
    job.then((res) => {
      show(isEditing?"Campaign Updated":"Campaign Created", {
        type: "success",
      });
      setStepStatus();
      setIsFinish(true);
      if(props.callback) props.callback();
      if (res.data?.data?._id) {
        // gets the uuid from original cause id
        const prefix = "cause-";
        const id = (res.data.data._id as string).substring(prefix.length);
        Router.push({
          pathname: "/cause/[id]",
          query: {
            id,
          },
        });
      }
    })
    .catch((error) => {
      show((error as Error).message || error, {
        type: "error",
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  /**
   * updates the stepMap and progresses to next step
   */
  const setStepStatus = () => {
    StepMap[step].isComplete = true;
    setStepMap(StepMap);
    stepNext();
  };

  /**
   * moves the editor state to next step
   */
  const stepNext = () => {
    if (stepMap[step].next) {
      setStep(stepMap[step].next || step);
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
  /**
   * prepares and returns the block list for the general info editor
   * from stored data
   * @returns
   */
  const getBlockListFromDto = (): SerializableBlock[] | null => {
    if (data?.title && data?.description) {
      return [
        {
          id: "new.cause.title",
          type: "h1" as BlockType,
          placeholder: "👋 Title of the Cause <small>[edit]</small>",
          blockAlignment: "left" as BlockAlignment,
          rawValue: data.title,
          nextBlockId: "new.cause.desc.block.1",
          hideMenu: true,
          nonZeroRawValueRequired: true,
        },
        ...data.description,
      ];
    } else {
      return null;
    }
  };

  /**
   * gets the initial values for cause goals
   * @returns
   */
  const getGoalInitValues = (): {
    target?: number;
    currency?: Currency;
    expiry?: Date;
  } => {
    return {
      target: data.target,
      currency: data.currency,
      expiry: data.expiry,
    };
  };

  const getBankInitValues = (): BankAccountDetails => {
    return data.bankAccount || ({} as BankAccountDetails);
  };

  const getLegalInitValue = (): Consent | null => {
    return data.ownersConsent || null;
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
                  .map(([key, _step], i) => (
                    <ListItem
                      key={i}
                      onClick={() => goToStep(key as CauseEditStep)}
                    >
                      <ListIcon
                        as={FaCheckCircle}
                        color={
                          _step.isComplete
                            ? "green.400"
                            : key === step
                            ? "orange.300"
                            : "gray.300"
                        }
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
          {step === CauseEditStep.GOALDETAILS && (
            <CauseGoalsForm
              onContinue={onCauseGoalContinue}
              init={getGoalInitValues()}
            />
          )}
          {step === CauseEditStep.BANKDETAILS && (
            <BankAccountDetailForm
              onSave={onCauseBankContinue}
              init={getBankInitValues()}
            />
          )}
          {step === CauseEditStep.LEGAL && (
            <CauseLegalForm
              onSave={onCauseLegalContinue}
              init={getLegalInitValue()}
            />
          )}
          {step === CauseEditStep.VERIFICATION && (
            <CauseVerificationForm
              submissionInProgress={isSubmitting}
              onSubmitToVerify={onSubmitToVerify}
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
  VERIFICATION = "USERVERIFICATION",
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
    next: CauseEditStep.VERIFICATION,
    isComplete: false,
  },
  [CauseEditStep.VERIFICATION]: {
    index: 5,
    label: "Verification",
    prev: CauseEditStep.LEGAL,
    next: null,
    isComplete: false,
  },
};
