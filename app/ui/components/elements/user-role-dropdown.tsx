import { Select } from "@chakra-ui/react";
import { UserRole } from "../../../types/dtos/user.dtos";
import { DonationStatus, ExpenseStatus } from "../../../types/enums/status";

export function UserRoleDropdown(props: {
  onChange: (status: any ) => void;
  current: any;
}) {
  return (
    <Select size={"sm"} placeholder="Select User Role" onChange={(e)=>props.onChange(e.target.value)} value={props.current}>
      <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
      <option value={UserRole.MODERATOR}>{UserRole.MODERATOR}</option>
      <option value={UserRole.REGULAR}>{UserRole.REGULAR}</option>
    </Select>
  );
}
