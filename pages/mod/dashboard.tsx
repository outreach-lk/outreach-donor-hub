import { DashboardLayout } from "../../app/ui/components/layouts/pages/dashboard";
import { FullScreenLoader } from "../../app/ui/components/modules/loader";

export default function ModeratorDashboard(){
    return <DashboardLayout>
            <FullScreenLoader/>
    </DashboardLayout>
}