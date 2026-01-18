import { AppError } from "./AppError";

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad Requst', statusCode: number = 400, errors?: any[]) {
        super(message, statusCode, errors)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthrized - Authentication required') {
        super(message, 401)
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden - Insufficient permissions') {
        super(message, 403)
    }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict - Resource already exists') {
    super(message, 409);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string = 'Unprocessable Entity', errors?: any[]) {
    super(message, 422, errors);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string = 'Too many requests - Please try again later') {
    super(message, 429);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(message, 503);
  }
}