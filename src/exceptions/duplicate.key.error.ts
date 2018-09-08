import { CustomError } from './';

export class DuplicateKeyError extends CustomError {
    constructor(message?: string, innerException?: CustomError) {
        super(message, innerException);
    }
}
