import { IDateService } from '../';

export class DateService implements IDateService {

    UTCString(): string {
        return new Date().toUTCString();
    }

    getDate(): Date {
        return new Date();
    }

    static getInstance(): DateService {
        return new DateService();
    }
}
