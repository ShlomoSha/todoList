import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export interface RouteError {
    status?: number;
    statusText?: string;
    message: string;
    data?: any;
}

export const useTypedRouteError = (): RouteError => {
    const error = useRouteError()

    if (isRouteErrorResponse(error)) {
        return {
            status: error.status,
            statusText: error.statusText,
            message: error.data?.message || error.statusText,
            data: error.data
        }
    }

    if (error instanceof Error) {
        return {
            message: error.message
        }
    }

    return {
        message: 'An unknown error occurred'
    }
}