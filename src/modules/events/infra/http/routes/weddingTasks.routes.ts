import { Router } from 'express';

import WeddingTasksController from '@modules/events/infra/http/controllers/WeddingTasksController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const weddingTasksRouter = Router();
const weddingTasksController = new WeddingTasksController();

weddingTasksRouter.use(ensureAuthenticated);

weddingTasksRouter.post('/', weddingTasksController.create);

export default weddingTasksRouter;
