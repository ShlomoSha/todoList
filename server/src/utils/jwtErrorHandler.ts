import { UnauthorizedError } from "../errors/httpErrors";

export const jwtErrorHandler = (err: any): UnauthorizedError => {
    let message: string =''
    switch (err.name) {

        case 'JsonWebTokenError':
            message = 'Invalid token - Please login again';

        case 'TokenExpiredError':
            message = 'Token expired - Please login again';
    }
    return new UnauthorizedError(message)
}