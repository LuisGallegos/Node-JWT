import express, {Application} from 'express';
import * as bodyParser from 'body-parser';
import { requireJwtAuth } from './common/interceptor';
import { loginController }  from './api/controllers/loginController'
import { usersController } from './api/controllers/usersController';

const app:Application = express();

app.use(bodyParser.json({limit: 100000000, type: 'application/json'}))

// Protect endpoints on this route
app.use('/api/inter/v1/users', requireJwtAuth, usersController);
app.use('/api/inter/v1/login', loginController);

export default app;