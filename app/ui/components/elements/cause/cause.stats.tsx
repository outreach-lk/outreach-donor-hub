import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
interface CauseStatProps {
  currentCollection: {
    acknowledged: number,
    pending: number
};
  target: number;
  currency: string;
}
export function CauseStats(props: CauseStatProps) {
  return (
    <Stat>
      <StatLabel>Confirmed Donations</StatLabel>
      <StatNumber>
        {props.currency} {props.currentCollection.acknowledged }
      </StatNumber>
      <StatHelpText>Total Donations: {props.currency} {props.currentCollection.acknowledged + props.currentCollection.pending}</StatHelpText>
      <StatLabel>Confirmed Expenses</StatLabel>
      <StatNumber>
        ({props.currency} {props.currentCollection.acknowledged })
      </StatNumber>
      <StatHelpText>Total Expenses: ({props.currency} {props.currentCollection.acknowledged + props.currentCollection.pending})</StatHelpText>
   </Stat>
  );
}
