export class HttpResponse {
    data: any;
    statusCode: number;
    error: Error;
    errors: string[];
    isSuccess: boolean;

    constructor(
        { data = null, statusCode = 200, errors = [], isSuccess = true, error = null }:
            { data?: any, statusCode?: number, errors?: string[], isSuccess?: boolean, error?: Error }
            = { data: null, statusCode: 200, errors: [], isSuccess: true, error: null }) {
        this.data = data;
        this.statusCode = statusCode;
        this.error = error;
        this.errors = errors;
        this.isSuccess = isSuccess;
    }
}
