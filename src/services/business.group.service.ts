import { IBusinessGroupService } from './';
import { BusinessGroup } from '../entities';
import { IBusinessGroupRepository, BusinessGroupRepository } from '../repositories';

export class BusinessGroupService implements IBusinessGroupService {

    private businessGroupRepository: IBusinessGroupRepository;

    async createBusinessGroup(businessGroup: BusinessGroup): Promise<string> {
        return await this.businessGroupRepository.createBusinessGroup(businessGroup);
    }

    async getBusinessGroupById(id: string): Promise<BusinessGroup> {
        return await this.businessGroupRepository.getBusinessGroupById(id);
    }

    static getInstance(): BusinessGroupService {
        const businessGroupService = new BusinessGroupService();
        businessGroupService.businessGroupRepository = BusinessGroupRepository.getInstance();

        return businessGroupService;
    }
}
