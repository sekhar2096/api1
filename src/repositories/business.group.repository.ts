import { IBusinessGroupRepository } from './';
import { IMongoConnectService, MongoConnectService } from '../services';
import { BusinessGroup } from '../entities';
import { DuplicateKeyError, CustomError } from '../exceptions';
import { ObjectID } from 'mongodb';
import { AppConfig } from '../config';

export class BusinessGroupRepository implements IBusinessGroupRepository {

    private mongoConnectService: IMongoConnectService;

    async createBusinessGroup(businessGroup: BusinessGroup): Promise<string> {
        const businessGroupCollection = await this.mongoConnectService.getCollection<BusinessGroup>(AppConfig.businessGroupCollection);
        let result = await businessGroupCollection.insertOne(businessGroup);

        return result.insertedId.toString();
    }

    async getAllBusinessGroups(): Promise<BusinessGroup[]> {
        const businessGroupCollection = await this.mongoConnectService.getCollection<BusinessGroup>(AppConfig.businessGroupCollection);

        return await businessGroupCollection.find({}).toArray();
    }

    async getBusinessGroupById(businessGroupId: string): Promise<BusinessGroup> {
        const businessGroupCollection = await this.mongoConnectService.getCollection<BusinessGroup>(AppConfig.businessGroupCollection);
        let id = new ObjectID(businessGroupId);

        return await businessGroupCollection.findOne<BusinessGroup>({ _id: id });
    }

    async updateBusinessGroup(businessGroup: BusinessGroup): Promise<boolean> {
        const businessGroupCollection = await this.mongoConnectService.getCollection<BusinessGroup>(AppConfig.businessGroupCollection);
        let businessGroupId = new ObjectID(businessGroup._id);
        delete businessGroup._id;
        let result = await businessGroupCollection.updateOne({ _id: businessGroupId }, { $set: businessGroup });

        return true;
    }

    async getBusinessGroupCount(): Promise<number> {
        const businessGroupCollection = await this.mongoConnectService.getCollection<BusinessGroup>(AppConfig.businessGroupCollection);

        return businessGroupCollection.count({});
    }

    static getInstance(): BusinessGroupRepository {
        const businessRepository = new BusinessGroupRepository();
        businessRepository.mongoConnectService = MongoConnectService.getInstance();

        return businessRepository;
    }
}
