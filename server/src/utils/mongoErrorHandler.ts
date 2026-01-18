import { BadRequestError } from "../errors/httpErrors";

export const MongoErrorHandler = (err: any): BadRequestError => {
    let message: string = 'DB error'
    let statusCode: number = 400
    let errors: any[] | undefined

    if (err.name === 'ValidationError') {
        message = 'Validation Error';
        errors = Object.values((err as any).errors).map((e: any) => ({
            field: e.path,
            message: e.message,
        }));
    }

    else if (err.name === 'CastError') {
        message = 'Invalid ID format';
    }

    else if ((err as any).code === 11000) {
        statusCode = 409;
        const field = Object.keys((err as any).keyValue)[0];
        message = `${field} already exists`;
    }

    return new BadRequestError(message, statusCode, errors)
}