/**
 * @todo: convert this into a NPM package
 * @todo: create factory interface and expose constructors
 */

type HttpCode = 400 | 401 | 404 | 500;

export interface Exception extends Error {
    httpCode: HttpCode;
    message: string;
    stack?: any;
    context?: Record<string, any>;
}

const $exception = {
    InternalError(message: string = "Interal Error", context?: any): Exception {
        return exceptionFactory(new Error(), "InternalError", message, 500, context);
    },

    ValidationError(message: string = "Validation Error"): Exception {
        return exceptionFactory(new Error(), "ValidationError", message, 400);
    },

    NotFound(message: string = "Resource not found"): Exception {
        return exceptionFactory(new Error(), "NotFoundError", message, 404);
    }
};
export default $exception;

/**
 * here be details
 */

function exceptionFactory(
    error: Error,
    name: string,
    message: string,
    httpCode: HttpCode,
    context?: any
): Exception {
    return Object.assign(error, {
        name,
        message,
        httpCode,
        context
    });
}
