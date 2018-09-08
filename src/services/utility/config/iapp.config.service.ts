export interface IAppConfigService {
    mongoConnectionString(): string;
    databaseName(): string;
}
