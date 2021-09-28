import { Router } from 'express';

import ListEventTasksByUserController from '@modules/events/infra/http/controllers/ListEventTasksByUserController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listEventTasksByUserRouter = Router();
const listEventTasksByUserController = new ListEventTasksByUserController();

listEventTasksByUserRouter.use(ensureAuthenticated);

listEventTasksByUserRouter.get(
  '/:user_id',
  listEventTasksByUserController.index,
);

export default listEventTasksByUserRouter;
