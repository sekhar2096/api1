import { express, bodyParser } from './external';
import { AdminControllerRouter, MasterControllerRouter, UserControllerRouter } from './routes';
import { ApplicationError } from './middlewares';

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

// attach controller-routes
app.use(AdminControllerRouter.baseUri, AdminControllerRouter.routes);
app.use(MasterControllerRouter.baseUri, MasterControllerRouter.routes);
app.use(UserControllerRouter.baseUri, UserControllerRouter.routes);

// attach global error handler
app.use(ApplicationError.globalHandler);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Server started listening on port ${port}`));
