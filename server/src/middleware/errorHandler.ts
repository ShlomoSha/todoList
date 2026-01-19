import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { NotFoundError } from "../errors/httpErrors";

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {

    let statusCode = 500;
    let message = 'Internal Server Error';
    let errors: any[] | undefined;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
         errors = err.errors;
    }
    
    else if (err.name === 'ValidationError') {
        message = 'Validation Error';
        statusCode = 400
        errors = Object.values((err as any).errors).map((e: any) => ({
            field: e.path,
            message: e.message,
        }));
    }
    
    else if ((err as any).code === 11000) {
        statusCode = 409;
        const field = Object.keys((err as any).keyValue)[0];
        message = `${field} already exists`;
    }

    else if (err.name === 'CastError') {
        statusCode = 400
        message = 'Invalid ID format';
    }

    else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token - Please login again';
    }

    else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired - Please login again';
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors })
    });
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    const error = new NotFoundError(`Route ${req.originalUrl} not found`);
    next(error);
}