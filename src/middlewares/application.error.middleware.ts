import { Request, Response, NextFunction } from 'express';
import { SystemFaultError, CustomError } from '../exceptions';
import { HttpResponse } from '../entities';

export const ApplicationError = {
    // This handler must be registered as last error handler with express
    globalHandler: (err: CustomError, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof SystemFaultError) {
            // crashes the container
            next(err);
        } else {
            // end the response, since this is the last error handler
            response.status(500).json(new HttpResponse({
                data: err.message,
                statusCode: 500,
                isSuccess: false,
                error: err,
                errors: err.innerException ? [err.innerException.message, err.innerException.stack] : []
            }));
        }
    }
};
