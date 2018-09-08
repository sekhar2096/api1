import { CustomError } from './';

export class SystemFaultError extends CustomError {
    constructor(message?: string, innerException?: CustomError) {
        super(message, innerException);
    }
}
