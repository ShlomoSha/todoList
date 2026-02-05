import axios from "axios";
import authService from "./authService";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
            const token = localStorage.getItem('token')
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

        return config
    },
    (error) => {
        return Promise.reject(error)
    },
    {
        runWhen: (config) => !config.url?.includes('/register')
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    authService.logout()
                    window.location.href = '/login'
                    break;
                case 403:
                    console.error('Access forbidden');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error('An error occurred: ', error.response.status);
            }
        }
        else if (error.request) {
            console.error("No response received: ", error.request);
        }
        else {
            console.error("Error: ", error.message);
        }
        return Promise.reject(error)
    }
)

export default axiosInstance