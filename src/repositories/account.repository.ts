import { IAccountRepository } from './';
import {
    IAppConfigService, IMongoConnectService, AppConfigService, MongoConnectService
} from '../services';
import { User } from '../entities';
import { MongoError, ObjectID } from 'mongodb';
import { DuplicateKeyError, CustomError } from '../exceptions';
import { AppConfig } from '../config';

export class AccountRepository implements IAccountRepository {

    private appConfigService: IAppConfigService;
    private mongoConnectService: IMongoConnectService;

    async createUser(user: User): Promise<string> {

        const usersCollection = await this.mongoConnectService.getCollection(AppConfig.usersCollection);

        try {
            let result = await usersCollection.insertOne(user);

            return result.insertedId.toString();
        } catch (ex) {
            let err: MongoError = ex;
            if (err.code === 11000) {
                throw new DuplicateKeyError(`Email already exists for admin account 
                ${user.primaryEmail}`);
            }

            throw new CustomError(`Error occurred while creating admin account 
            ${user.primaryEmail}`, ex);
        }
    }

    async login(user: User): Promise<User> {
        const usersCollection = await this.mongoConnectService.getCollection<User>(AppConfig.usersCollection);

        return await usersCollection.findOne<User>({ primaryEmail: user.primaryEmail, status: 'active' });
    }

    async getUserById(userId: string): Promise<User> {
        const usersCollection = await this.mongoConnectService.getCollection<User>(AppConfig.usersCollection);
        let id = new ObjectID(userId);

        return await usersCollection.findOne<User>({ _id: id, status: 'active' });
    }

    async getAllUsersByBusinessGroupId(businessGroupId: string): Promise<User[]> {
        const usersCollection = await this.mongoConnectService.getCollection<User>(AppConfig.usersCollection);

        return await usersCollection.find({ businessGroupID: businessGroupId, status: 'active' }).toArray();
    }

    async updateUser(user: User): Promise<boolean> {
        const usersCollection = await this.mongoConnectService.getCollection<User>(AppConfig.usersCollection);
        let userId = new ObjectID(user._id);
        delete user._id;
        let result = await usersCollection.updateOne({ _id: userId }, { $set: user });

        return true;
    }

    async deleteUser(id: string, modifiedDate: Date): Promise<boolean> {
        const usersCollection = await this.mongoConnectService.getCollection<User>(AppConfig.usersCollection);
        let userId = new ObjectID(id);
        let result = await usersCollection.updateOne({ _id: userId }, { $set: { status: 'inactive', modifiedDate: modifiedDate } });

        return true;
    }

    async getUserCount(): Promise<number> {
        const usersCollection = await this.mongoConnectService.getCollection<User>(AppConfig.usersCollection);

        return await usersCollection.count({ status: 'active' });
    }

    static getInstance(): AccountRepository {
        const accountRepository = new AccountRepository();
        accountRepository.appConfigService = AppConfigService.getInstance();
        accountRepository.mongoConnectService = MongoConnectService.getInstance();

        return accountRepository;
    }
}
