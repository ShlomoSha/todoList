import { TOKEN } from "../constants/constants";
import { ROUTES } from "../routes/routes.constants";
import type { LoginDTO, RegisterDTO } from "../types/dto/auth.dto";
import createEndpoint from "./apiHelper.utlis";
import axiosInstance from "./axiosConfig";

const authEndpoint = createEndpoint(ROUTES.AUTH)

const authService = {
    login: (credentials: LoginDTO) => axiosInstance.post(authEndpoint(ROUTES.LOGIN), credentials),
    register: (userData: RegisterDTO) => axiosInstance.post(authEndpoint(ROUTES.REGISTER), userData),
    logout: async () => {
        localStorage.removeItem(TOKEN)
    },
}

export default authService

