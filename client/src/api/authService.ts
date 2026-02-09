import { ROUTES, TOKEN } from "../constants/constants";
import type { AuthDto } from "../types/auth.dto";
import createEndpoint from "./apiHelper.utlis";
import axiosInstance from "./axiosConfig";

const authEndpoint = createEndpoint(ROUTES.AUTH)

const authService = {
    login: (credentials: AuthDto) => axiosInstance.post(authEndpoint(ROUTES.LOGIN), credentials),
    register: (userData: AuthDto) => axiosInstance.post(authEndpoint(ROUTES.REGISTER), userData),
    logout: async () => {
        localStorage.removeItem(TOKEN)
    },
}

export default authService

