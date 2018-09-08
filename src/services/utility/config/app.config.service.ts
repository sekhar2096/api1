import { IAppConfigService } from '../../';
import { AppConfig } from '../../../config';

export class AppConfigService implements IAppConfigService {
    env = process.env;

    mongoConnectionString(): string {
        return this.env.MONGO_CONNECTION_STRING || AppConfig.mongoConnectionString;
    }
    databaseName(): string {
        return this.env.MONGO_DB || AppConfig.mongoDB;
    }

    static getInstance(): IAppConfigService {
        return new AppConfigService();
    }
}
