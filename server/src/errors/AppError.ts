export class AppError extends Error {

    constructor(
        message: string,
        public statusCode: number = 500,
        public errors? : any[],
    ) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
        this.errors = errors
    }
}