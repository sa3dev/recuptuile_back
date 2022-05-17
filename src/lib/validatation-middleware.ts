import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { UnprocessableEntityError } from './errors';

type Perimeter = 'body' | 'query' | 'params';

export default function validationMiddleware(perimeter: Perimeter, schema: Joi.SchemaLike) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.validate(req[perimeter], schema, { abortEarly: true, allowUnknown: false });
        if (error) {
            const e = new UnprocessableEntityError(error.details[0].message);
            return next(e);
        } else {
            return next();
        }
    }
}