import { express } from '../external';
import { MasterController } from '../controllers';
import { HttpResponse } from '../entities';
import { CustomError } from '../exceptions';

const router = express.Router();

router.post('/create', async (req, res, next) => {
    try {
        const masterController = MasterController.getInstance();
        masterController.request = req;
        masterController.response = res;
        masterController.next = next;

        let result = await masterController.createMaster();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while creating master account.', ex));
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const masterController = MasterController.getInstance();
        masterController.request = req;
        masterController.response = res;
        masterController.next = next;

        let result = await masterController.login();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while logging into master account.', ex));
    }
});

router.post('/edit', async (req, res, next) => {
    try {
        const masterController = MasterController.getInstance();
        masterController.request = req;
        masterController.response = res;
        masterController.next = next;

        let result = await masterController.edit();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while editing the master account.', ex));
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const masterController = MasterController.getInstance();
        masterController.request = req;
        masterController.response = res;
        masterController.next = next;

        let result = await masterController.update();

        res.json(new HttpResponse({
            data: result
        }));
    } catch (ex) {
        next(new CustomError('Exception while editing the master account.', ex));
    }
});

export const MasterControllerRouter = {
    baseUri: '/api/accounts/master',
    routes: router
};
