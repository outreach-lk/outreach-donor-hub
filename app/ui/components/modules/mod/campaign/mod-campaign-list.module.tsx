import {
  Button,
  ButtonGroup,
  Center,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  AuditableCauseDto,
  CauseDto,
} from "../../../../../types/dtos/cause.dtos";
import { Page } from "../../../../../types/pagable";
import { CauseCard } from "../../../elements/cause/cause-card";
import { DashboardLayout } from "../../../layouts/pages/dashboard";
import { EntityListPage } from "../../../layouts/pages/entity/entity.list.layout";
import { getDateFromFirebaseDateTimeObject } from "../../../../../utils/date-time";
import { VerificationStatus } from "../../../../../types/enums/status";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import Link from "next/link";
import { getConfig } from "../../../../../config";
import { Renderable } from "../../../../../types/props/common";
import { ModTableUserButton } from "../../../elements/user/mod-table-user-btn";
import { EntityIDButton } from "../../../elements/mod-table-campaign-btn";

export default function ModCampaignList(props: {
  status: VerificationStatus;
  action?: (data: CauseDto) => Renderable;
}) {
  const [page, setPage] = useState<Page>({ start: 0, limit: 8 });
  let lastId: string = "";
  const map = new Map<string, number>();
  map.set("verificationStatus", props.status);
  const openCauseInNewTab = (id: string) => {
    window.open(
      getConfig().appUrl.concat("/cause/").concat(id.split("cause-")[1])
    );
  };
  return (
    <>
      <TableContainer>
        <Table variant={"simple"} colorScheme="linkedin" size={"md"}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Action</Th>
              <Th>Created On</Th>
              <Th>Created By</Th>
              <Th>Updaed On</Th>
              <Th>Updaed By</Th>
            </Tr>
          </Thead>
          <Tbody>
            <EntityListPage entity="cause" raw={true} page={page} query={map} replace={true}>
              {(data: AuditableCauseDto) => {
                lastId = data.id as string;
                return (
                  <Tr>
                    <Td>
                      <EntityIDButton
                        id={data.id as string}
                        title={data.title}
                        entity="cause"
                        open={true}
                      />
                      {/* <Button
                        variant={"link"}
                        onClick={() => openCauseInNewTab(data.id as string)}
                        leftIcon={<FaExternalLinkSquareAlt />}
                      >
                        {data.title}
                      </Button> */}
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
                      <ModTableUserButton uid={data.createdBy as string}/>
                    </Td>
                    <Td>
                      {getDateFromFirebaseDateTimeObject(
                        data.updatedOn as any
                      ).toLocaleString()}
                    </Td>
                    <Td>
                    <ModTableUserButton uid={data.updatedBy as string}/>
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
    </>
  );
}
