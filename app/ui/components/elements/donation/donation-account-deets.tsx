import {
  Box,
  List,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Cause from "../../../../data/entities/cause.entity";
import BANKS from "../../../../../Sri-Lanka-Bank-and-Branch-List/banks.json";
import BRANCHES from "../../../../../Sri-Lanka-Bank-and-Branch-List/branches.json";
import { useEffect, useState } from "react";
import { BankBranch } from "../bank-account-detail-form";

interface DonationAccountDetailsProps {
  cause: Cause;
}
export function DonationAccountDetails(props: DonationAccountDetailsProps) {
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  useEffect(() => {
    const _bankName = BANKS.find(
      (bank) => bank.ID === parseInt(props.cause.bankAccount.bank)
    )?.name;
    const _branchName = (BRANCHES as { [key: string]: BankBranch[] })[
      props.cause.bankAccount.bank
    ].find(
      (branch) => branch.ID === parseInt(props.cause.bankAccount.branch)
    )?.name;

    if (_bankName) {
      setBankName(_bankName);
    }
    if (_branchName) {
      setBranchName(_branchName);
    }
  }, [props]);
  return (
    <Box>
      <List>
        <ListItem fontWeight={"bold"} fontSize={"2xl"}>
          {props.cause.bankAccount.accountNumber}
        </ListItem>
        <ListItem fontWeight={"bold"} fontSize={"xl"}>
          {props.cause.bankAccount.accountHolderName}
        </ListItem>
        <ListItem fontWeight={"bold"} fontSize={"xl"}>
          {bankName}
        </ListItem>
        <ListItem fontWeight={"bold"}>{branchName}</ListItem>
      </List>
    </Box>
  );
}
