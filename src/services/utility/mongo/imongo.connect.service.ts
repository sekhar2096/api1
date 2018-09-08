import { MongoClient, Collection } from 'mongodb';

export interface IMongoConnectService {
    getMongoClient(): Promise<MongoClient>;
    getCollection<T>(collection?: string): Promise<Collection<T>>;
}
