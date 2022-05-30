import {
  Badge,
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
import { AuditableUserDto, UserDto, UserRole } from "../../../../../types/dtos/user.dtos";
import { getMultipleValuesFromArray } from "../../../../../utils/parse-querystring";
  
  export default function ModUserList(props: {
    roles: UserRole | UserRole[];
    action?: (data: UserDto) => Renderable;
  }) {
    const [page, setPage] = useState<Page>({ start: 0, limit: 8 });
    let lastId: string = "";
    const map = new Map<string, string>();
    map.set("role", getMultipleValuesFromArray(props.roles));
    return (
      <>
        <TableContainer>
          <Table variant={"simple"} colorScheme="linkedin" size={"md"}>
            <Thead>
              <Tr>
                <Th>uid</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
                <Th>Created On</Th>
                <Th>Created By</Th>
                <Th>Updated On</Th>
                <Th>Updated By</Th>
              </Tr>
            </Thead>
            <Tbody>
              <EntityListPage entity="user" raw={true} page={page} query={map} replace={true}>
                {(data: AuditableUserDto) => {
                  lastId = data.uid as string;
                  return (
                    <Tr>
                      <Td>
                        <ModTableUserButton uid={data.uid as string} />
                      </Td>
                      <Td>
                        {data.email}
                      </Td>
                      <Td>
                        <Badge>{data.role}</Badge>
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
                        {data.updatedOn?
                        getDateFromFirebaseDateTimeObject(
                          data.updatedOn as any
                        ).toLocaleString()
                          :"-"
                      }
                      </Td> 
                      <Td>
                        {data.updatedBy?
                        <ModTableUserButton uid={data.updatedBy as string}/>
                        :"-"}
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
  