import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
interface CauseStatProps {
  amount: number;
  target: number;
  currency: string;
}
export function CauseStats(props: CauseStatProps) {
  return (
    <Stat>
      <StatLabel>Total Donations</StatLabel>
      <StatNumber>
        {props.currency} {props.amount}
      </StatNumber>
      <StatHelpText>Confirmed Donations: {props.target}</StatHelpText>
    </Stat>
  );
}
