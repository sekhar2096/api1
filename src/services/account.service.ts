import { IAccountService, IDateService, DateService, ICryptoService, CryptoService, IEncryptService, EncryptService } from './';
import { IAccountRepository, AccountRepository, IBusinessGroupRepository, BusinessGroupRepository } from '../repositories';
import { User, BusinessGroup } from '../entities';

export class AccountService implements IAccountService {

    private accountRepository: IAccountRepository;
    private businessRepository: IBusinessGroupRepository;
    private dateService: IDateService;
    private cryptoService: ICryptoService;
    private encryptService: IEncryptService;

    async createAdmin(user: User): Promise<any> {
        user.accountType = 'admin';
        user.status = 'active';
        user.phoneNumber = await this.cryptoService.encrypt(user.phoneNumber);
        user.password = await this.encryptService.encrypt(user.password);
        user.createdDate = this.dateService.getDate();
        let userId = await this.accountRepository.createUser(user);

        return { userId: userId, businessGroupId: '0' };
    }

    async createMaster(user: User, businessGroup: BusinessGroup): Promise<any> {
        user.accountType = 'master';
        user.status = 'active';
        businessGroup.createdDate = this.dateService.getDate();
        let businessGroupId = await this.businessRepository.createBusinessGroup(businessGroup);
        if (businessGroupId) {
            user.businessGroupID = businessGroupId;
            user.phoneNumber = await this.cryptoService.encrypt(user.phoneNumber);
            user.password = await this.encryptService.encrypt(user.password);
            user.createdDate = this.dateService.getDate();
            let userId = await this.accountRepository.createUser(user);

            return { userId: userId, businessGroupId: businessGroupId };
        }
    }

    async createUser(user: User): Promise<any> {
        user.accountType = 'user';
        user.status = 'active';
        user.phoneNumber = await this.cryptoService.encrypt(user.phoneNumber);
        user.password = await this.encryptService.encrypt(user.password);
        user.createdDate = this.dateService.getDate();
        let userId = await this.accountRepository.createUser(user);

        return { userId: userId, businessGroupId: user.businessGroupID };
    }

    async getUserById(userId: string): Promise<User> {
        let user: User = await this.accountRepository.getUserById(userId);
        user.phoneNumber = await this.cryptoService.decrypt(user.phoneNumber);

        return user;
    }

    async getAllUsersByBusinessGroupId(businessGroupId: string): Promise<User[]> {
        let users = await this.accountRepository.getAllUsersByBusinessGroupId(businessGroupId);
        let result = users.map(async user => {
            user.phoneNumber = await this.cryptoService.decrypt(user.phoneNumber);

            return user;
        });

        return await Promise.all(result);
    }

    async updateAdminDetails(user: User): Promise<boolean> {
        user.phoneNumber = await this.cryptoService.encrypt(user.phoneNumber);
        user.modifiedDate = await this.dateService.getDate();

        return this.accountRepository.updateUser(user);
    }

    async updateMasterDetails(user: User, businessGroup: BusinessGroup): Promise<boolean> {
        user.phoneNumber = await this.cryptoService.encrypt(user.phoneNumber);
        user.modifiedDate = await this.dateService.getDate();
        let isUserUpdated = await this.accountRepository.updateUser(user);
        if (isUserUpdated) {
            businessGroup.modifiedDate = this.dateService.getDate();

            return await this.businessRepository.updateBusinessGroup(businessGroup);
        }

        return false;
    }

    async updateUserDetails(user: User): Promise<boolean> {
        user.phoneNumber = await this.cryptoService.encrypt(user.phoneNumber);
        user.modifiedDate = await this.dateService.getDate();

        return await this.accountRepository.updateUser(user);
    }

    async deleteUserDetails(id: string): Promise<boolean> {
        let modifiedDate = await this.dateService.getDate();

        return await this.accountRepository.deleteUser(id, modifiedDate);
    }

    async getUserAndBusinessGroupCount(): Promise<any> {
        return {
            userCount: await this.accountRepository.getUserCount(),
            businessGroupCount: await this.businessRepository.getBusinessGroupCount()
        };
    }

    static getInstance(): AccountService {
        const accountService = new AccountService();
        accountService.accountRepository = AccountRepository.getInstance();
        accountService.businessRepository = BusinessGroupRepository.getInstance();
        accountService.dateService = DateService.getInstance();
        accountService.cryptoService = CryptoService.getInstance();
        accountService.encryptService = EncryptService.getInstance();

        return accountService;
    }
}
