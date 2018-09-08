import { BusinessGroup } from '../entities';

export interface IBusinessGroupService {
    createBusinessGroup(businessGroup: BusinessGroup): Promise<string>;
    getBusinessGroupById(id: string): Promise<BusinessGroup>;
}
