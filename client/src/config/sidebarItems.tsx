import { CheckCircleRounded, DashboardRounded, PersonRounded, RadioButtonUncheckedRounded } from "@mui/icons-material";
import type { SidebarItem } from "../types/sidebarItems.interface";
import { taskEndpoint } from "../api/tasksService";
import { ROUTES } from "../routes/routes.constants";

const SIDEBAR_ITEMS: SidebarItem[] = [
    {
        label: 'All tasks',
        icon: <DashboardRounded fontSize="small" />,
        path: taskEndpoint(ROUTES.ALL_TASKS),
        badgeKey: 'total'
    },
    {
        label: 'Pending',
        icon: <RadioButtonUncheckedRounded fontSize="small" />,
        path: taskEndpoint(ROUTES.PENDING),
        badgeKey: 'pending'
    },
    {
        label: 'Done',
        icon: <CheckCircleRounded fontSize="small" />,
        path: taskEndpoint(ROUTES.DONE),
        badgeKey: 'done'
    },
    {
        label: 'Profile',
        icon: <PersonRounded fontSize="small" />,
        path: taskEndpoint(ROUTES.PROFILE),
        badgeKey: 'profile'
    },
]

export default SIDEBAR_ITEMS