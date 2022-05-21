import { Select } from "@chakra-ui/react";
import { DonationStatus, ExpenseStatus } from "../../../types/enums/status";

export function ClaimStatusDropDown(props: {
  onChange: (status: any ) => void;
  current: any;
}) {
  return (
    <Select size={"sm"} placeholder="Select Claim Status" onChange={(e)=>props.onChange(e.target.value)} value={props.current}>
      <option value="claimed">Claimed (Pending) </option>
      <option value="acknowledged">Acknowledged</option>
      <option value="disputed">Disputed</option>
      <option value="rejected">Rejected</option>
    </Select>
  );
}
