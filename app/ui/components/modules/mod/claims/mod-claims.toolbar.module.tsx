import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  DonationStatus,
  ExpenseStatus,
} from "../../../../../types/enums/status";
import { ClaimStatusDropDown } from "../../../elements/claim-status-dropdown";

export function ModClaimsToolbar(props: {
  status: DonationStatus | ExpenseStatus;
  setStatus(status: DonationStatus | ExpenseStatus): void;
  setCampaign(campaign?: string): void;
  setId(id?: string): void;
}) {
  const [query, setQuery] = useState<string>();
  const [err, setErr] = useState(false);
  return (
    <Stack maxW="full" direction={"row"} justify="space-between">
      <HStack maxW={"sm"}>
        <Heading size={"xs"}>Status</Heading>
        <ClaimStatusDropDown
          onChange={(v) => props.setStatus(v)}
          current={props.status}
        />
      </HStack>
      <HStack minW={"xl"}>
        {/* Search by Campaign */}
        <Input
          size="sm"
          type="text"
          placeholder="Search by Campaign or Claim ID"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
          isInvalid={err}
        />
        <Button
          size="xs"
          p="4"
          leftIcon={<SearchIcon />}
          aria-label={""}
          disabled={query === undefined || query.length === 0}
          onClick={() => {
            setErr(false);
            if (query === undefined || query?.length === 0) {
              props.setCampaign();
              props.setId();
            } else if (query?.match("cause")) {
              props.setCampaign(query);
            } else if (query?.match("donation") || query?.match("expense")) {
              props.setId(query);
            } else {
              setErr(true);
            }
          }}
        >
          Search
        </Button>
        <Button
          size={"xs"}
          p="4"
          onClick={() => {
            setQuery('');
            props.setCampaign();
            props.setId();
          }}
        >
          Clear Search
        </Button>
      </HStack>
    </Stack>
  );
}
