import { IMongoConnectService, IAppConfigService, AppConfigService } from '../../';
import { MongoClient, Collection } from 'mongodb';

export class MongoConnectService implements IMongoConnectService {

    private mongoClient: MongoClient;
    private appConfig: IAppConfigService;

    async getMongoClient(): Promise<MongoClient> {
        if (this.mongoClient === undefined) {
            this.mongoClient = await MongoClient.connect(this.appConfig.mongoConnectionString());
        }

        return this.mongoClient;
    }

    async getCollection<T>(collection?: string): Promise<Collection<T>> {

        let client = await this.getMongoClient();
        const db = client.db(this.appConfig.databaseName());

        return db.collection<T>(collection);
    }

    static getInstance(): MongoConnectService {
        const mongoConnectService = new MongoConnectService();
        mongoConnectService.appConfig = AppConfigService.getInstance();

        return mongoConnectService;
    }
}
