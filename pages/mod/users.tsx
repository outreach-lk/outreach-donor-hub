import { Box, HStack, Wrap } from "@chakra-ui/react";
import { UserRole } from "../../app/types/dtos/user.dtos";
import { DashboardLayout } from "../../app/ui/components/layouts/pages/dashboard";
import ChangeUserRole from "../../app/ui/components/modules/user/change-user-role";
import ChangeUserVerification from "../../app/ui/components/modules/user/change-user-verification";

export default function ModUsers(){
    return <DashboardLayout>
            <Wrap>
                <ChangeUserRole role={UserRole.MODERATOR}/>
                <ChangeUserRole role={UserRole.ADMIN}/>
                {/* <ChangeUserVerification /> */}
            </Wrap>
    </DashboardLayout>
}