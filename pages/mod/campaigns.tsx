import {
  Button,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import { AuditableCauseDto, CauseDto } from "../../app/types/dtos/cause.dtos";
import { Page } from "../../app/types/pagable";
import { CauseCard } from "../../app/ui/components/elements/cause/cause-card";
import { DashboardLayout } from "../../app/ui/components/layouts/pages/dashboard";
import { EntityListPage } from "../../app/ui/components/layouts/pages/entity/entity.list.layout";
import { getDateFromFirebaseDateTimeObject } from "../../app/utils/date-time";

export default function ModeratorDashboard() {
  const [page, setPage] = useState<Page>({ start: 0, limit: 8 });
  let lastId: string = '';
  return (
    <DashboardLayout>
      <TableContainer>
        <Table variant={"striped"} colorScheme="linkedin">
          <Thead>
            <Th>Title</Th>
            <Th>Created On</Th>
            <Th>Created By</Th>
          </Thead>
          <Tbody>
            <EntityListPage entity="cause" raw={true} page={page} replace={true}>
              {(data: AuditableCauseDto) => {
                lastId = data.id as string;
                return (
                  <Tr>
                    <Td>{data.title}</Td>
                    <Td>
                      {getDateFromFirebaseDateTimeObject(
                        data.createdOn as any
                      ).toDateString()}
                    </Td>
                    <Td>{data.createdBy}</Td>
                  </Tr>
                );
              }}
            </EntityListPage>
          </Tbody>
        </Table>

        <Wrap py={"12"} justify="center" minW="full">
        <Button onClick={()=>{
              setPage({
                  limit: page.limit,  
                  start: 0
              })
          }}>Prev Page</Button>
          <Button onClick={()=>{
              setPage({
                  limit: page.limit,  
                  start: lastId
              })
          }}>Next Page</Button>
        </Wrap>
      </TableContainer>
    </DashboardLayout>
  );
}
