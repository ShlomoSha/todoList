import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { NotFoundError } from "../errors/httpErrors";

export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {

    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(err instanceof AppError && err.errors ? { errors: err.errors } : {})
    });
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    const error = new NotFoundError(`Route ${req.originalUrl} not found`);
    next(error);
}