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
} from "../../../../../../types/dtos/cause.dtos";
import { Page } from "../../../../../../types/pagable";
import { CauseCard } from "../../../../elements/cause/cause-card";
import { DashboardLayout } from "../../../../layouts/pages/dashboard";
import { EntityListPage } from "../../../../layouts/pages/entity/entity.list.layout";
import { getDateFromFirebaseDateTimeObject } from "../../../../../../utils/date-time";
import { VerificationStatus } from "../../../../../../types/enums/status";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import Link from "next/link";
import { getConfig } from "../../../../../../config";
import { Renderable } from "../../../../../../types/props/common";

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
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <EntityListPage entity="cause" raw={true} page={page} query={map}>
              {(data: AuditableCauseDto) => {
                lastId = data.id as string;
                return (
                  <Tr>
                    <Td>
                      <Button
                        variant={"link"}
                        onClick={() => openCauseInNewTab(data.id as string)}
                        leftIcon={<FaExternalLinkSquareAlt />}
                      >
                        {data.title}
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
                      ).toDateString()}
                    </Td>
                    <Td>{data.createdBy}</Td>
                    <Td>{data.updatedBy}</Td>
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
