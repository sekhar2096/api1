import {
    ILoginService, LoginService, IAccountService, AccountService,
    IBusinessGroupService,
    BusinessGroupService
} from '../services';
import { HttpResponse, User, BusinessGroup } from '../entities';
import { Controller } from './controller';

export class MasterController extends Controller {

    private loginService: ILoginService;
    private accountService: IAccountService;
    private businessGroupService: IBusinessGroupService;

    constructor() {
        super();
    }

    async createMaster(): Promise<any> {
        let user: User = this.request.body.User;
        let businessGroup: BusinessGroup = this.request.body.BusinessGroup;

        return await this.accountService.createMaster(user, businessGroup);
    }

    async login(): Promise<any> {
        let user: User = this.request.body;
        let objUser = await this.loginService.login(user);
        if (objUser != null && objUser.businessGroupID !== '0') {
            let objBusinessGroup = await this.businessGroupService.getBusinessGroupById(objUser.businessGroupID);

            return { user: objUser, businessGroup: objBusinessGroup };
        }

        return { user: objUser, businessGroup: null };
    }

    async edit(): Promise<any> {
        let masterId = this.request.body.Id;
        let objUser = await this.accountService.getUserById(masterId);
        if (objUser != null && objUser.businessGroupID !== '0') {
            let objBusinessGroup = await this.businessGroupService.getBusinessGroupById(objUser.businessGroupID);

            return { user: objUser, businessGroup: objBusinessGroup };
        }

        return { user: objUser, businessGroup: null };
    }

    async update(): Promise<boolean> {
        let user: User = this.request.body.User;
        let businessGroup: BusinessGroup = this.request.body.BusinessGroup;

        return await this.accountService.updateMasterDetails(user, businessGroup);
    }

    // async update(): Promise<boolean> {

    // }

    static getInstance(): MasterController {
        const masterController = new MasterController();
        masterController.loginService = LoginService.getInstance();
        masterController.accountService = AccountService.getInstance();
        masterController.businessGroupService = BusinessGroupService.getInstance();

        return masterController;
    }
}
