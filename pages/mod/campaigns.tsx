import {
  Box,
  Button,
  Center,
  Heading,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCheckCircle, FaCross, FaStop, FaUndo } from "react-icons/fa";
import Cause from "../../app/data/entities/cause.entity";
import { useFeedback } from "../../app/hooks/feedback.hook";
import { AuditableCauseDto, CauseDto } from "../../app/types/dtos/cause.dtos";
import { VerificationStatus } from "../../app/types/enums/status";
import { Page } from "../../app/types/pagable";
import { CauseCard } from "../../app/ui/components/elements/cause/cause-card";
import { DashboardLayout } from "../../app/ui/components/layouts/pages/dashboard";
import { EntityListPage } from "../../app/ui/components/layouts/pages/entity/entity.list.layout";
import ModCampaignList from "../../app/ui/components/modules/mod/campaign/table/mod-campaign-list.module";
import { getDateFromFirebaseDateTimeObject } from "../../app/utils/date-time";

export default function ModeratorDashboard() {
  const boxBg = useColorModeValue("white","facebook.800");
  const {show} = useFeedback();
  const [tabIndex, setTabIndex] = useState(0);

  /**
   * makes a request to change the 
   * verification status to inprogress
   */
  const handleVerificationUpdate = (data: CauseDto,newStatus:VerificationStatus) => {
    const cause = new Cause(data);
    cause.status = newStatus;
    cause.isVerified = newStatus===VerificationStatus.VERIFIED;
    cause.update()
    .then(()=>{
      const labels = Object.values(VerificationStatus)
      show(labels[newStatus].toLocaleString(),{
        type:"success",
        title: "Campaign Verification"
      })
      handleTabChange(newStatus);
    })
    .catch(error=>{
      show(error,{
        type:"error",
        title: "Campaign Verification Error"
      })
    })
  }

  const handleTabChange = (status:VerificationStatus) => {
    switch(status){
      case VerificationStatus.PENDING:
        setTabIndex(0);
        break;
      case VerificationStatus.INPROGRESS:
        setTabIndex(1);
        break;
      case VerificationStatus.VERIFIED:
        setTabIndex(2);
        break;
      case VerificationStatus.REJECTED:
        setTabIndex(3);
        break;
    }

  }
  
  return (
    <DashboardLayout>
      <Tabs isLazy index={tabIndex} onChange={(index)=>setTabIndex(index)}>
      <TabList>
        <Tab>Pending</Tab>
        <Tab>In Progress</Tab>
        <Tab>Verified</Tab>
        <Tab>Rejected</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box px="6" pt={"6"} bg={boxBg} rounded={"md"}>
            <Heading size={"md"}>Pending Campaigns</Heading>
            <Box p="4">
              <ModCampaignList 
                status={VerificationStatus.PENDING} 
                action={(data)=>{
                  return <Button onClick={()=>handleVerificationUpdate(data, VerificationStatus.INPROGRESS)}>Begin Verification</Button>
                }}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box px="6" pt={"6"} bg={boxBg} rounded={"md"}>
            <Heading size={"md"}>Verification In Progress Campaigns</Heading>
            <Box p="4">
              <ModCampaignList status={VerificationStatus.INPROGRESS} 
               action={(data)=>{
                return <>
                  <Button 
                    colorScheme={"whatsapp"}
                    leftIcon={<FaCheckCircle/>}
                    onClick={()=>handleVerificationUpdate(data, VerificationStatus.VERIFIED)}>Verify</Button>
                  <Button 
                  colorScheme={"red"}
                  leftIcon={<FaStop/>}
                  onClick={()=>handleVerificationUpdate(data, VerificationStatus.REJECTED)}>Reject</Button>
                  <Tooltip label="Adds campaign back to In Progress">
                  <Button onClick={()=>handleVerificationUpdate(data, VerificationStatus.PENDING)}>Dequeue</Button>
                  </Tooltip>

                </>
              }}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box px="6" pt={"6"} bg={boxBg} rounded={"md"}>
            <Heading size={"md"}>Verified Campaigns</Heading>
            <Box p="4">
              <ModCampaignList status={VerificationStatus.VERIFIED} 
               action={(data)=>{
                return <>
                  <Button leftIcon={<FaUndo/>} onClick={()=>handleVerificationUpdate(data, VerificationStatus.INPROGRESS)}>Undo</Button>
                </>
              }}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <Box px="6" pt={"6"} bg={boxBg} rounded={"md"}>
            <Heading size={"md"}>Rejected Campaigns</Heading>
            <Box p="4">
              <ModCampaignList status={VerificationStatus.REJECTED} 
               action={(data)=>{
                return <>
                  <Button 
                    leftIcon={<FaUndo/>}
                    onClick={()=>handleVerificationUpdate(data, VerificationStatus.INPROGRESS)}
                    >Undo</Button>
                </>
              }}
              />
            </Box>
          </Box>
        </TabPanel>
      </TabPanels>
      </Tabs>
    </DashboardLayout>
  );
}
