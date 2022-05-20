import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaCheckCircle,
  FaQuestion,
  FaQuestionCircle,
  FaStop,
  FaUndo,
} from "react-icons/fa";
import Donation from "../../app/data/entities/donation.entity";
import Expense from "../../app/data/entities/expense.entity";
import { useAuth } from "../../app/hooks/auth.hooks";
import { useFeedback } from "../../app/hooks/feedback.hook";
import { DonationDto } from "../../app/types/dtos/donation.dtos";
import { ExpenseDto } from "../../app/types/dtos/expense.dtos";
import { DonationStatus, ExpenseStatus } from "../../app/types/enums/status";
import { Renderable } from "../../app/types/props/common";
import { ClaimStatusDropDown } from "../../app/ui/components/elements/claim-status-dropdown";
import { DashboardLayout } from "../../app/ui/components/layouts/pages/dashboard";
import ModClaimList from "../../app/ui/components/modules/mod/claims/mod-claims.list.module";

export default function DashboardClaims() {
  const boxBg = useColorModeValue("white", "facebook.800");
  const {show} = useFeedback();
  const [tabIndex, setTabIndex] = useState(0);
  // Temporary placeholder to store the campaign value as user types
  const [_campaign, _setCampaign] = useState<string>();
  // value to be used to query data
  const [campaign, setCampaign] = useState<string>();
    const {user} = useAuth(); 
  const [donationStatus, setDonationStatus] = useState<DonationStatus>(
    DonationStatus.CLAIMED
  );
  const [expenseStatus, setExpenseStatus] = useState<ExpenseStatus>(
    ExpenseStatus.CLAIMED
  );

  /**
   * NOTE: use of DonationStatus is applicable to both claim types.
   * FIXME: fucking merge them together!
   * @param data
   * @returns
   */
  const AcknowledgeBtn = (data: ExpenseDto | DonationDto) => (
    <Button
      disabled={data.owner === user?.uid}  
      onClick={() => handleClaimStatusChange(data, DonationStatus.ACKNOWLEDGED)}
      size={"xs"}
      colorScheme={"whatsapp"}
      leftIcon={<FaCheckCircle />}
    >
      Acknowledge
    </Button>
  );
  /**
   * NOTE: use of DonationStatus is applicable to both claim types.
   * FIXME: fucking merge them together!
   * @param data
   * @returns
   */
  const DisputeBtn = (data: ExpenseDto | DonationDto) => (
    <Button
      disabled={data.owner === user?.uid}  
      onClick={() => handleClaimStatusChange(data, DonationStatus.DISPUTED)}
      size={"xs"}
      colorScheme={"yellow"}
      leftIcon={<FaQuestionCircle />}
    >
      Dispute
    </Button>
  );
  /**
   * NOTE: use of DonationStatus is applicable to both claim types.
   * FIXME: fucking merge them together!
   * @param data
   * @returns
   */
  const RejectBtn = (data: ExpenseDto | DonationDto) => (
    <Button
      disabled={data.owner === user?.uid}  
      onClick={() => handleClaimStatusChange(data, DonationStatus.REJECTED)}
      size={"xs"}
      colorScheme={"red"}
      leftIcon={<FaStop />}
    >
      Reject
    </Button>
  );
  /**
   * NOTE: use of DonationStatus is applicable to both claim types.
   * FIXME: fucking merge them together!
   * @param data
   * @returns
   */
  const UndoBtn = (data: ExpenseDto | DonationDto) => (
    <Button
      disabled={data.owner === user?.uid}  
      onClick={() => handleClaimStatusChange(data, DonationStatus.CLAIMED)}
      size={"xs"}
      leftIcon={<FaUndo />}
    >
      Undo
    </Button>
  );
  /**
   * gets available actions based on the current status.
   * works for both types.
   * TODO: Expenses and Donations are almost identical
   * in so many levels, make them into one common entity maybe?
   */
  const getActions = (data: DonationDto | ExpenseDto): Renderable => {
    const buttons = [];
    const status = tabIndex?expenseStatus:donationStatus
    switch (status) {
      case DonationStatus.CLAIMED:
        buttons.push(AcknowledgeBtn(data), DisputeBtn(data), RejectBtn(data));
        break;
      case DonationStatus.ACKNOWLEDGED:
      case DonationStatus.DISPUTED:
      case DonationStatus.REJECTED:
        buttons.push(UndoBtn(data));
    }
    return <>{buttons}</>;
  };

  /**
   * makes a request to change the status of the claim
   * @param data
   * @param newState
   */
  const handleClaimStatusChange = (
    data: ExpenseDto | DonationDto,
    newState: ExpenseStatus | DonationStatus
  ) => {
      /**understand claim type by tab index. FIXME: Seriously? merge the two types into one claim type */
      let status = tabIndex?'expense':'donation';
      let promise: Promise<any>;
      if(status==="expense"){
        const expense = new Expense(data as ExpenseDto);
        expense.status = newState as ExpenseStatus;
        promise = expense.update();
      }else{
        const donation = new Donation(data as DonationDto);
        donation.status = newState as DonationStatus;
        promise = donation.update();
      }
      promise
      .then(() => {
        show(newState.toLocaleString(), {
          type: "success",
          title: "Claim Verification",
        });
        if(status==='expense'){
            setExpenseStatus(newState as ExpenseStatus);
        }else{
            setDonationStatus(newState as DonationStatus);
        }
      })
      .catch((error) => {
        show(error, {
          type: "error",
          title: "Claim Verification Error",
        });
      });

  };

  return (
    <DashboardLayout>
      <Tabs isLazy index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Donation Claims</Tab>
          <Tab>Expense Claims</Tab>
        </TabList>
        <TabPanels>
          {/* Donation Claims */}
          <TabPanel>
            <Box px="6" pt={"6"} bg={boxBg} rounded={"md"}>
              <Heading size={"md"}>Donation Claims</Heading>
              <Box p="4">
                {/* Tools */}
                <Stack maxW="full" direction={"row"} justify="space-between">
                  <HStack maxW={"sm"}>
                    <Heading size={"xs"}>Status</Heading>
                    <ClaimStatusDropDown
                      onChange={(v) => setDonationStatus(v)}
                      current={donationStatus}
                    />
                  </HStack>
                  <HStack minW={"md"}>
                    {/* Search by Campaign */}
                    <InputGroup>
                      <InputRightElement
                        children={
                          <IconButton
                            icon={<SearchIcon />}
                            color="gray.300"
                            aria-label={""}
                            onClick={() => {
                              console.log(_campaign);
                              setCampaign(_campaign);
                            }}
                          />
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Search by Campaign"
                        onChange={(e) => _setCampaign(e.target.value)}
                      />
                    </InputGroup>
                  </HStack>
                </Stack>
                <ModClaimList
                  claimType="donation"
                  status={donationStatus}
                  action={getActions}
                  campaign={campaign}
                />
              </Box>
            </Box>
          </TabPanel>
          {/* 
            Expense Claim Panel
            TODO: Repeated code.
          */}
          <TabPanel>
            <Box px="6" pt={"6"} bg={boxBg} rounded={"md"}>
              <Heading size={"md"}>Expense Claims</Heading>
              <Box p="4">
                <Stack maxW="full" direction={"row"} justify="space-between">
                  <HStack maxW={"sm"}>
                    <Heading size={"xs"}>Status</Heading>
                    <ClaimStatusDropDown
                      onChange={(v) => setExpenseStatus(v)}
                      current={expenseStatus}
                    />
                  </HStack>
                  <HStack minW={"md"}>
                    {/* Search by Campaign */}
                    <InputGroup>
                      <InputRightElement
                        children={
                          <IconButton
                            icon={<SearchIcon />}
                            color="gray.300"
                            aria-label={""}
                            onClick={() => {
                              console.log(_campaign);
                              setCampaign(_campaign);
                            }}
                          />
                        }
                      />
                      <Input
                        type="text"
                        placeholder="Search by Campaign"
                        onChange={(e) => _setCampaign(e.target.value)}
                      />
                    </InputGroup>
                  </HStack>
                </Stack>
                <ModClaimList
                  claimType="expense"
                  status={expenseStatus}
                  action={getActions}
                />
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
}
