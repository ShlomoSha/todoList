import { ROUTES, TOKEN } from "../constants/constants";
import type { AuthDto } from "../types/auth.interface";
import axiosInstance from "./axiosConfig";

const authService = {
    login: (credentials: AuthDto) => axiosInstance.post(`/${ROUTES.AUTH}/${ROUTES.LOGIN}`, credentials),
    register: (userData: AuthDto) => axiosInstance.post(`/${ROUTES.AUTH}/${ROUTES.REGISTER}`, userData),
    logout: async () => {
        localStorage.removeItem(TOKEN)
    }
}

export default authService

