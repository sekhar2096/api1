import { express } from '../external';
import { AdminController } from '../controllers';
import { HttpResponse } from '../entities';
import { CustomError } from '../exceptions';

const router = express.Router();

// add router-specific middleware invokes before every request
// ...

router.post('/create', async (req, res, next) => {
    try {
        const adminController = AdminController.getInstance();
        adminController.request = req;
        adminController.response = res;
        adminController.next = next;

        let result = await adminController.createAdmin();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while creating admin account.', ex));
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const adminController = AdminController.getInstance();
        adminController.request = req;
        adminController.response = res;
        adminController.next = next;

        let result = await adminController.login();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while logging into admin account.', ex));
    }
});

router.post('/edit', async (req, res, next) => {
    try {
        const adminController = AdminController.getInstance();
        adminController.request = req;
        adminController.response = res;
        adminController.next = next;

        let result = await adminController.edit();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while editing admin account.', ex));
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const adminController = AdminController.getInstance();
        adminController.request = req;
        adminController.response = res;
        adminController.next = next;

        let result = await adminController.update();
        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while editing admin account.', ex));
    }
});

router.get('/', (req, res, next) => {
    try {
        res.json(new HttpResponse({
            data: 'Welcome to admin'
        }));
    } catch (ex) {
        next(ex);
    }
});

// add router-specific middleware invokes after every request
// ...

export const AdminControllerRouter = {
    baseUri: '/api/accounts/admin',
    routes: router
};
