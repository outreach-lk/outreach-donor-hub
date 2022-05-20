import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  AuditableCauseDto,
  CauseDto,
} from "../../../../../types/dtos/cause.dtos";
import { Page } from "../../../../../types/pagable";
import { CauseCard } from "../../../elements/cause/cause-card";
import { DashboardLayout } from "../../../layouts/pages/dashboard";
import { EntityListPage } from "../../../layouts/pages/entity/entity.list.layout";
import { getDateFromFirebaseDateTimeObject } from "../../../../../utils/date-time";
import {
  DonationStatus,
  ExpenseStatus,
  VerificationStatus,
} from "../../../../../types/enums/status";
import {
  FaCheckCircle,
  FaExternalLinkSquareAlt,
  FaFile,
  FaImage,
  FaQuestionCircle,
  FaStopCircle,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";
import { getConfig } from "../../../../../config";
import { Renderable } from "../../../../../types/props/common";
import {
  AuditableDonationDto,
  DonationDto,
} from "../../../../../types/dtos/donation.dtos";
import {
  AuditableExpenseDto,
  ExpenseDto,
} from "../../../../../types/dtos/expense.dtos";
import { stringify } from "querystring";
import { RemoteImage } from "../../remote-image";
import { FileDto } from "../../../../../types/dtos/remote-file.dtos";
import { ModTableUserButton } from "../../../elements/user/mod-table-user-btn";
import { EntityIDButton } from "../../../elements/mod-table-campaign-btn";
type ProofModalData = {
  file: FileDto;
  title: string;
};
export default function ModClaimList(props: {
  status: DonationStatus | ExpenseStatus;
  claimType: string;
  campaign?: string;
  action?: (data: any) => Renderable;
}) {
  const [page, setPage] = useState<Page>({ start: 0, limit: 8 });
  let lastId: string = "";
  const map = new Map<string, string>();
  const [query, setQuery] = useState<Map<string, string>>(map);
  map.set("status", props.status);

  useEffect(() => {
    map.set("status", props.status);
    setQuery(map);
    setPage({ start: 0, limit: page.limit });
  }, [props.status]);

  useEffect(() => {
    if (props.campaign) {
      map.set("causeId", props.campaign);
    } else {
      map.delete("causeId");
    }
    setQuery(map);
    setPage({ start: 0, limit: page.limit });
  }, [props.campaign]);

  const {
    isOpen: isProofOpen,
    onClose: onProofClose,
    onOpen: onProofOpen,
    onToggle: onProofToggle,
  } = useDisclosure();

  const [proofModalData, setProofModalData] = useState<ProofModalData>();
  /**
   * opens / closes claim expense modal.
   * @param data
   */
  const toggleProofView = (data: DonationDto | ExpenseDto) => {
    setProofModalData({
      file:
        props.claimType === "donation"
          ? ((data as DonationDto).evidence?.at(0)?.attachments as FileDto)
          : ((data as ExpenseDto).evidence as FileDto),
      title:
        props.claimType === "donation"
          ? "Proof of Transaction"
          : "Proof of Expense",
    });
    onProofToggle();
  };

  return (
    <>
      <TableContainer>
        <Table variant={"simple"} colorScheme="linkedin" size={"md"}>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Campaign</Th>
              <Th>Amount</Th>
              <Th>Note</Th>
              <Th>Proof</Th>
              <Th>Action</Th>
              <Th>Created On</Th>
              <Th>Created By</Th>
              <Th>Updated On</Th>
              <Th>Updated By</Th>
            </Tr>
          </Thead>
          <Tbody>
            <EntityListPage
              entity={props.claimType}
              raw={true}
              page={page}
              query={query}
            >
              {(data: AuditableDonationDto | AuditableExpenseDto) => {
                lastId = data.id as string;
                return (
                  <Tr>
                    <Td>
                    <EntityIDButton entity="donation" id={data.id as string} />
                    </Td>
                    <Td>
                      <EntityIDButton entity="cause" id={data.causeId} open={true}/>
                    </Td>
                    <Td>
                      <HStack>
                        <Text>
                          {"LKR "}
                          {data.amount.toFixed(2)}
                        </Text>
                    
                        {data.status === "acknowledged" && (
                          <Tooltip label="Confirmed Claim">
                            <Icon>
                              <FaCheckCircle color="green" />
                            </Icon>
                          </Tooltip>
                        )}
                        {data.status === "disputed" && (
                          <Tooltip label="Disputed Claim">
                            <Icon>
                              <FaQuestionCircle color="orange" />
                            </Icon>
                          </Tooltip>
                        )}
                        {data.status === "rejected" && (
                          <Tooltip label="Disputed Claim">
                            <Icon>
                              <FaStopCircle color="red" />
                            </Icon>
                          </Tooltip>
                        )}
                      </HStack>
                    </Td>
                    <Td>
                      {data.note ? (
                        <Popover>
                          <PopoverTrigger>
                            <Button size={"xs"} leftIcon={<FaFile />}>
                              View Note
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverCloseButton />
                            <PopoverHeader>Expense Note</PopoverHeader>
                            <PopoverBody overflowWrap="break-word">
                              <Box
                                maxH={"sm"}
                                overflowY="scroll"
                                whiteSpace={"break-spaces"}
                              >
                                {data.note}
                              </Box>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <Badge>N/A</Badge>
                      )}
                    </Td>
                    <Td>
                      <Button
                        disabled={
                          props.claimType === "donation"
                            ? !!!(data as DonationDto).evidence?.at(0)
                                ?.attachments
                            : !!!(data as ExpenseDto).evidence
                        }
                        size={"xs"}
                        leftIcon={<FaImage />}
                        onClick={() => toggleProofView(data)}
                      >
                        View Proof
                      </Button>
                    </Td>
                    <Td>
                      {props.action && (
                        <ButtonGroup size={"sm"} variant="outline">
                          {props.action(data)}
                        </ButtonGroup>
                      )}
                    </Td>
                    <Td>
                      {getDateFromFirebaseDateTimeObject(
                        data.createdOn as any
                      ).toLocaleString()}
                    </Td>
                    <Td>
                      <ModTableUserButton uid={data.createdBy as string} />
                    </Td>
                    <Td>
                      {getDateFromFirebaseDateTimeObject(
                        data.updatedOn as any
                      ).toLocaleString()}
                    </Td>
                    <Td>
                      <ModTableUserButton uid={data.updatedBy as string} />
                    </Td>
                  </Tr>
                );
              }}
            </EntityListPage>
          </Tbody>
        </Table>
      </TableContainer>
      <Wrap py={"12"} justify="center" minW="full">
        <Button
          onClick={() => {
            setPage({
              limit: page.limit,
              start: lastId,
            });
          }}
          colorScheme="blue"
        >
          Load More
        </Button>
      </Wrap>
      {/* Proof Modal */}
      {proofModalData && (
        <Modal onClose={onProofClose} isOpen={isProofOpen} size="2xl">
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>{proofModalData?.title}</ModalHeader>
            <ModalBody>
              <RemoteImage file={proofModalData.file} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
