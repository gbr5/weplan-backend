import { Router } from 'express';

import EventServiceOrdersController from '@modules/events/infra/http/controllers/EventServiceOrdersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventServiceOrdersRouter = Router();
const eventServiceOrdersController = new EventServiceOrdersController();

eventServiceOrdersRouter.use(ensureAuthenticated);

eventServiceOrdersRouter.post('/', eventServiceOrdersController.create);

export default eventServiceOrdersRouter;
