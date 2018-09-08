export class CustomError extends Error {
    innerException: Error;
    constructor(message: string, ex?: Error) {
        super(message);
        this.innerException = ex;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
