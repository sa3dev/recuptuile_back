import { NOT_FOUND, INTERNAL_SERVER_ERROR, 
    FORBIDDEN, BAD_REQUEST, UNAUTHORIZED,
    UNPROCESSABLE_ENTITY
} from 'http-status-codes';

export abstract class BaseError extends Error {
    
    statusCode: number;

    constructor(message?: string) {
        super(message);
    }

}

export class InternalServerError extends BaseError {
    statusCode: number = INTERNAL_SERVER_ERROR;
}

export class NotFoundError extends BaseError {
    statusCode: number = NOT_FOUND;
}

export class ForbiddenError extends BaseError {
    statusCode: number = FORBIDDEN;
}

export class UnauthorizedError extends BaseError {
    statusCode: number = UNAUTHORIZED;
}

export class BadRequestError extends BaseError {
    statusCode: number = BAD_REQUEST;
}

export class UnprocessableEntityError extends BaseError {
    statusCode: number = UNPROCESSABLE_ENTITY;
}