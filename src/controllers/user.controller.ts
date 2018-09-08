import {
    ILoginService, LoginService, IAccountService, AccountService,
    IBusinessGroupService,
    BusinessGroupService
} from '../services';
import { HttpResponse, User, BusinessGroup } from '../entities';
import { Controller } from './controller';

export class UserController extends Controller {

    private loginService: ILoginService;
    private accountService: IAccountService;
    private businessGroupService: IBusinessGroupService;

    constructor() {
        super();
    }

    async createUser(): Promise<any> {
        let user: User = this.request.body;

        return await this.accountService.createUser(user);
    }

    async login(): Promise<any> {
        let user: User = this.request.body;
        let objUser = await this.loginService.login(user);
        if (objUser != null) {
            let objBusinessGroup = await this.businessGroupService.getBusinessGroupById(objUser.businessGroupID);

            return { user: objUser, businessGroup: objBusinessGroup };
        }

        return null;
    }

    async edit(): Promise<any> {
        let userId = this.request.body.Id;
        let objUser = await this.accountService.getUserById(userId);
        if (objUser != null) {
            let objBusinessGroup = await this.businessGroupService.getBusinessGroupById(objUser.businessGroupID);

            return { user: objUser, businessGroup: objBusinessGroup };
        }

        return null;
    }

    async update(): Promise<boolean> {
        let user: User = this.request.body;

        return await this.accountService.updateUserDetails(user);
    }

    async delete(): Promise<boolean> {
        let userId: string = this.request.body.Id;

        return await this.accountService.deleteUserDetails(userId);
    }

    async getUserById(): Promise<User> {
        let userId: string = this.request.body.Id;

        return await this.accountService.getUserById(userId);
    }

    async getAllUsersByBusinessGroupId(): Promise<User[]> {
        let businessGroupID = this.request.body.Id;

        return await this.accountService.getAllUsersByBusinessGroupId(businessGroupID);
    }

    async getUserAndBusinessGroupCount(): Promise<any> {
        return await this.accountService.getUserAndBusinessGroupCount();
    }

    static getInstance(): UserController {
        const userController = new UserController();
        userController.loginService = LoginService.getInstance();
        userController.accountService = AccountService.getInstance();
        userController.businessGroupService = BusinessGroupService.getInstance();

        return userController;
    }
}
