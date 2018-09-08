import { User, BusinessGroup } from '../entities';
import { ObjectID } from 'mongodb';

export interface IAccountRepository {
    createUser(user: User): Promise<string>;
    login(user: User): Promise<User>;
    getUserById(userId: string): Promise<User>;
    getAllUsersByBusinessGroupId(businessGroupId: string): Promise<User[]>;
    updateUser(user: User): Promise<boolean>;
    deleteUser(id: string, modifiedDate: Date): Promise<boolean>;
    getUserCount(): Promise<number>;
}
