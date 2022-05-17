import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
interface CauseStatProps {
  currentCollection: {
    acknowledged: number,
    pending: number
};
expenses: {
  confirmed: number,
  pending: number
}
  target: number;
  currency: string;
}
export function CauseStats(props: CauseStatProps) {
  return (
    <Stat>
      <StatLabel>Confirmed Donations</StatLabel>
      <StatNumber>
        {props.currency} { Number(props.currentCollection?.acknowledged||0).toFixed(2) }
      </StatNumber>
      <StatHelpText>Total Donations: {props.currency} {Number(props.currentCollection?.acknowledged + props.currentCollection?.pending || 0).toFixed(2)}</StatHelpText>
      {props.expenses&&
      <>
      <StatLabel>Confirmed Expenses</StatLabel>
      <StatNumber>
        ({props.currency} {Number(props.expenses.confirmed||0).toFixed(2) })
      </StatNumber>
      <StatHelpText>Total Expenses: ({props.currency} {Number(props.expenses.confirmed + props.expenses.pending || 0).toFixed(2)})</StatHelpText>
      </>
      }
   </Stat>
  );
}
