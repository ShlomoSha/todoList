import axiosInstance from "./axiosConfig";
import createEndpoint from "./apiHelper.utlis";
import { ROUTES } from "../routes/routes.constants";

export const userEndpoint = createEndpoint(ROUTES.USERS)

export const userService = {
    updateProfile: (data: { username?: string, email?: string }) => 
        axiosInstance.patch(userEndpoint(ROUTES.PROFILE), data),
}
