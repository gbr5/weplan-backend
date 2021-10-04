import { Router } from 'express';

import CreateEventOwnerTaskController from '@modules/events/infra/http/controllers/CreateEventOwnerTaskController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createEventOwnerTaskRouter = Router();
const createEventOwnerTaskController = new CreateEventOwnerTaskController();

createEventOwnerTaskRouter.use(ensureAuthenticated);

createEventOwnerTaskRouter.post('/', createEventOwnerTaskController.create);

export default createEventOwnerTaskRouter;
