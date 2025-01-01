export interface ApiErrorParams {
    statusCode: number;
    message: string;
    errors?: Array<string | Error>;
    stack?: string;
}

class ApiError extends Error {
    statusCode: number;
    data: null;
    success: boolean;
    errors: Array<string | Error>;

    constructor({
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    }: ApiErrorParams) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError};