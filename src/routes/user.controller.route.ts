import { express } from '../external';
import { UserController } from '../controllers';
import { HttpResponse } from '../entities';
import { CustomError } from '../exceptions';

const router = express.Router();

router.post('/create', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.createUser();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while creating user account.', ex));
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.login();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while logging into user account.', ex));
    }
});

router.post('/edit', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.edit();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while editing the user account.', ex));
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.update();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while updating the user account.', ex));
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.delete();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while deleting the user account.', ex));
    }
});

router.post('/getUserById', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.getUserById();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while getting user data by id.', ex));
    }
});

router.post('/getAllUsersByBusinessGroupId', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.getAllUsersByBusinessGroupId();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while getting all user data by business group id.', ex));
    }
});

router.get('/getUserAndBusinessGroupCount', async (req, res, next) => {
    try {
        const userController = UserController.getInstance();
        userController.request = req;
        userController.response = res;
        userController.next = next;

        let result = await userController.getUserAndBusinessGroupCount();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while getting user data by id.', ex));
    }
});

export const UserControllerRouter = {
    baseUri: '/api/accounts/user',
    routes: router
};
