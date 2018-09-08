import { User, BusinessGroup } from '../entities';

export interface IAccountService {
    createAdmin(user: User): Promise<any>;
    createMaster(user: User, businessGroup: BusinessGroup): Promise<any>;
    createUser(user: User): Promise<any>;
    getUserById(userId: string): Promise<User>;
    getAllUsersByBusinessGroupId(businessGroupId: string): Promise<User[]>;
    updateAdminDetails(user: User): Promise<boolean>;
    updateMasterDetails(user: User, businessGroup: BusinessGroup): Promise<boolean>;
    updateUserDetails(user: User): Promise<boolean>;
    deleteUserDetails(id: string): Promise<boolean>;
    getUserAndBusinessGroupCount(): Promise<any>;
}
