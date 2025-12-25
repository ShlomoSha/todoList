export class AppError extends Error {
    public readonly isOperatoinal: boolean;

    constructor(
        public readonly message: string,
        public readonly statusCode: number = 500,
        public readonly errors? : any[],
    ) {
        super(message)
        this.isOperatoinal = true
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}