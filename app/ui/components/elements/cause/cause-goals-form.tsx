import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { FormEventHandler } from "react";
import { Currency } from "../../../../types/enums/currency";
import { formatDate } from "../../../../utils/date-time";

interface CauseGoalsFormProps {
  onContinue: (target?: number, currency?: Currency, expiry?: Date) => void;
  init?: {
    target?: number;
    currency?: Currency;
    expiry?: Date;
  };
}
export function CauseGoalsForm(props: CauseGoalsFormProps) {
  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const data = {
      target: (e.target as any).target.value as number,
      currency: (e.target as any).currency.value as Currency,
      expiry: (e.target as any).expiry.value as Date,
    };
    console.log(data);
    props.onContinue(data.target,data.currency,new Date(data.expiry));
  };
  return (
    <form onSubmit={onFormSubmit}>
      <Flex direction={"column"}>
        <Box>
          <FormControl>
            <FormLabel htmlFor="target">Target Amount of Donations</FormLabel>
            <Input id="target" type="number" defaultValue={props.init?.target} />
            <FormHelperText>
              This is an optional detail. Leave empty if there's no target
              amount
            </FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="currency">Campaign Currency</FormLabel>
            <Select id="currency" placeholder="Select Target Currency" defaultValue={props.init?.currency}>
              {Object.values(Currency).map((c, i) => (
                <option key={i}>{c.valueOf()}</option>
              ))}
            </Select>
            <FormHelperText>
              Currency with which donations are collected / to which are converted.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="expiry">Campaign Expiry Date</FormLabel>
            <Input id="expiry" type="date"  defaultValue={(props.init?.expiry)?formatDate(props.init?.expiry):''} />
            <FormHelperText>
              This is an optional detail. The Campaign will stop accepting donations from this date
            </FormHelperText>
          </FormControl>
        </Box>
        <Spacer />
        <Stack py="12">
          <Button colorScheme={"blue"} type="submit">
            Save
          </Button>
        </Stack>
      </Flex>
    </form>
  );
}
