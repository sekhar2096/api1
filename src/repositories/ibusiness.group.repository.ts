import { BusinessGroup } from '../entities';

export interface IBusinessGroupRepository {
    createBusinessGroup(businessGroup: BusinessGroup): Promise<string>;
    getAllBusinessGroups(): Promise<BusinessGroup[]>;
    getBusinessGroupById(businessGroupId: string): Promise<BusinessGroup>;
    updateBusinessGroup(businessGroup: BusinessGroup): Promise<boolean>;
    getBusinessGroupCount(): Promise<number>;
}
