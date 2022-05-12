import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactEventHandler,
  useEffect,
  useState,
} from "react";
import BANKS from "../../../../Sri-Lanka-Bank-and-Branch-List/banks.json";
import BRANCHES from "../../../../Sri-Lanka-Bank-and-Branch-List/branches.json";
import { BankAccountDetails } from "../../../types/dtos/bank-details.dto";
export type Bank = {
  ID: number;
  name: string;
};
export type BankBranch = {
  bankID: number;
  ID: number;
  name: string;
};

interface BankAccountDetailFormProps {
  onSave: (data: BankAccountDetails) => void;
  init: BankAccountDetails;
}

export function BankAccountDetailForm(props: BankAccountDetailFormProps) {
  const [bank, setBank] = useState<Bank | null>(null);
  const [branches, setBranches] = useState<BankBranch[] | null>(null);

  useEffect(() => {
    if (props.init?.bank) {
      const _branches = (BRANCHES as { [key: string]: BankBranch[] })[
        props.init.bank
      ];
      setBranches(_branches);
    }
  }, [props.init]);

  const handleSelectBank: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const id = e.target.value;
    setBank(BANKS.find((b) => b.ID === Number(id)) as Bank);
    const _branches = (BRANCHES as { [key: string]: BankBranch[] })[id];
    setBranches(_branches);
  };

  const handleFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const data: BankAccountDetails = {
      bank: (e.target as any).bank.value as string,
      branch: (e.target as any).branch.value as string,
      accountNumber: (e.target as any).accountNumber.value as string,
      accountHolderName: (e.target as any).accountHolderName.value as string,
      isHolderTheOwner: (e.target as any).isHolderTheOwner.checked as boolean,
    };
    props.onSave(data);
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <Box>
        <FormControl isRequired>
          <FormLabel htmlFor="bank">Bank</FormLabel>
          <Select
            id="bank"
            placeholder="Select Bank"
            onChange={handleSelectBank}
            value={bank?.ID || props.init.bank || ""}
            defaultValue={props.init.bank || ""}
          >
            {BANKS.map((b, i) => (
              <option key={`bank-${b.ID}`} value={b.ID}>
                {b.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="branch">Branch</FormLabel>
          {branches && (
            <Select
              id="branch"
              placeholder="Select Branch"
              defaultValue={props.init.branch || ""}
            >
              {branches?.map((b, i) => (
                <option key={`bank-${b.bankID}-${b.ID}`} value={b.ID}>
                  {b.name}
                </option>
              ))}
            </Select>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
          <Input
            id="accountNumber"
            type="number"
            defaultValue={props.init.accountNumber}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="accountHolderName">
            Account Holder's Name
          </FormLabel>
          <Input
            id="accountHolderName"
            defaultValue={props.init.accountHolderName}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="isHolderTheOwner">
            Are you the owner of this account?
          </FormLabel>
          <Switch
            id="isHolderTheOwner"
            defaultChecked={props.init.isHolderTheOwner}
          />
          <FormHelperText>Toggle the switch on if Yes</FormHelperText>
        </FormControl>
      </Box>
      <Stack>
        <Button colorScheme={"blue"} type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
}
