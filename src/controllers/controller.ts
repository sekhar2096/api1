import { Request, Response, NextFunction } from 'express';

export class Controller {
    request: Request;
    response: Response;
    next: NextFunction;
}
