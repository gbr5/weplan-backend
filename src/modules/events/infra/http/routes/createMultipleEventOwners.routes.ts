import { Router } from 'express';

import CreateMultipleEventOwnersController from '@modules/events/infra/http/controllers/CreateMultipleEventOwnersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createMultipleEventOwnersRouter = Router();
const createMultipleEventOwners = new CreateMultipleEventOwnersController();

createMultipleEventOwnersRouter.use(ensureAuthenticated);

createMultipleEventOwnersRouter.post('/', createMultipleEventOwners.create);

export default createMultipleEventOwnersRouter;
