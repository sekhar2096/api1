import { ILoginService, LoginService, IAccountService, AccountService } from '../services';
import { HttpResponse, User } from '../entities';
import { Controller } from './controller';

export class AdminController extends Controller {

    private loginService: ILoginService;
    private accountService: IAccountService;

    constructor() {
        super();
    }

    async createAdmin(): Promise<any> {
        let adminUser: User = this.request.body;

        return await this.accountService.createAdmin(adminUser);
    }

    async login(): Promise<any> {
        let user: User = this.request.body;

        return await this.loginService.login(user);
    }

    async edit(): Promise<any> {
        let adminId = this.request.body.Id;

        return await this.accountService.getUserById(adminId);
    }

    async update(): Promise<boolean> {
        let adminUser: User = this.request.body;

        return await this.accountService.updateAdminDetails(adminUser);
    }

    static getInstance(): AdminController {
        const adminController = new AdminController();
        adminController.loginService = LoginService.getInstance();
        adminController.accountService = AccountService.getInstance();

        return adminController;
    }
}
