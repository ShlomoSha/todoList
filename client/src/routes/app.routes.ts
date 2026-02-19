import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import ForgotPassword from "../pages/authPages/ForgotPassword";
import Login from "../pages/authPages/Login";
import Register from "../pages/authPages/Register";
import ResetPassword from "../pages/authPages/ResetPassword";
import Tasks from "../pages/Tasks";
import { ROUTES } from "./routes.constants";
import type { RouteConfig } from "./routes.interface";

const appRoute: RouteConfig[] = [
    {
        path: '/',
        component: AppLayout,
        defaultRoute: ROUTES.AUTH,
        children: [
            {
                path: ROUTES.AUTH,
                component: AuthLayout,
                defaultRoute: ROUTES.LOGIN,
                children: [
                    {
                        path: ROUTES.LOGIN,
                        component:Login
                    },
                    {
                        path: ROUTES.REGISTER,
                        component: Register
                    },
                    {
                        path: ROUTES.FORGOT_PASSWORD,
                        component: ForgotPassword
                    },
                    {
                        path: ROUTES.RESET_PASSWORD,
                        component: ResetPassword
                    },
                ]
            },
            {
                path: ROUTES.TASKS,
                component: Tasks
            }
        ]
    }
]

export default appRoute