/**
 * expenses related to a given cause
 */

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
  useColorModeValue,
  Wrap,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import Cause from "../../../app/data/entities/cause.entity";
import Expense from "../../../app/data/entities/expense.entity";
import { useAuth } from "../../../app/hooks/auth.hooks";
import { useEntity } from "../../../app/hooks/entity";
import { useFeedback } from "../../../app/hooks/feedback.hook";
import { ExpenseDto } from "../../../app/types/dtos/expense.dtos";
import { ExpenseStatus } from "../../../app/types/enums/status";
import { EntityListPage } from "../../../app/ui/components/layouts/pages/entity/entity.list.layout";
import { ExpenseCard } from "../../../app/ui/components/modules/expense/expense-card.module";
import { Footer } from "../../../app/ui/components/modules/Footer";
import { Nav } from "../../../app/ui/components/modules/Navigation";
import { getDateFromFirebaseDateTimeObject } from "../../../app/utils/date-time";

export default function CauseExpenses() {
  const { query, push } = useRouter();
  const { fetchEntity, checkEntityPerms } = useEntity("cause");
  const [canReview, setCanReview] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEntity("cause-" + query.id).then((res) => {
      if (res.data?.data) {
        const { canUpdate } = checkEntityPerms(new Cause(res.data.data));
        setCanReview(canUpdate);
      }
    });
  }, []);

  const map = new Map<string, string>();
  map.set("causeId", "cause-" + query.id);
  
  return (
    <>
      <Nav />
      <Container minW={"full"} p="4" bg={useColorModeValue("gray.200", "auto")}>
        <Wrap direction={"column"} mb="12">
          <Heading size={"sm"}>Expenses</Heading>
          <Button
            onClick={() => {
              push("/cause/" + query.id);
            }}
          >
            Back to Campaign
          </Button>
        </Wrap>
        <EntityListPage
          entity="expense"
          query={map}
          isEmbedded={true}
          showFullScreenLoader={false}
          emptyListScreen={
            <Box>
              <Heading>No Expenses, Yet!</Heading>
              <Text>This campaign does not have expense claims</Text>
            </Box>
          }
        >
          {(_data: ExpenseDto) => {           
            // FIXME: Move to own component
            return (
              <ExpenseCard data={_data} canReview={canReview} isOwner={_data.owner === user?.uid}/>
            );
          }}
        </EntityListPage>
      </Container>
      <Footer />
    </>
  );
}
