import { TOKEN } from "../constants/constants";
import { ROUTES } from "../routes/routes.constants";
import type { CheckDTO, LoginDTO, RegisterDTO, ResetPasswordDTO } from "../types/dto/auth.dto";
import createEndpoint from "./apiHelper.utlis";
import axiosInstance from "./axiosConfig";

export const authEndpoint = createEndpoint(ROUTES.AUTH)

const authService = {
    login: (credentials: LoginDTO) => axiosInstance.post(authEndpoint(ROUTES.LOGIN), credentials),
    register: (userData: RegisterDTO) => axiosInstance.post(authEndpoint(ROUTES.REGISTER), userData),
    logout: async () => {
        localStorage.removeItem(TOKEN)
    },
    checkAvailability: (checkData: CheckDTO) => axiosInstance.post(authEndpoint(ROUTES.CHECK_AVAILABILITY), checkData),
    forgotPassword: (email: string) => axiosInstance.post(authEndpoint(ROUTES.FORGOT_PASSWORD), { email }),
    resetPassword: (data: ResetPasswordDTO) => axiosInstance.post(authEndpoint(ROUTES.RESET_PASSWORD), data)
}

export default authService