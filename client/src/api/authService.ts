import type { AuthDto } from "../types/auth.interface";
import axiosInstance from "./axiosConfig";

const authApi = axiosInstance.create({
    baseURL: '/auth'
})

const authService = {
    login: (credentials: AuthDto) => authApi.post('/login', credentials),
    register: (userData: AuthDto) => authApi.post('/register', userData),
    logout: async () => {
        localStorage.removeItem('token')
    }
}

export default authService

