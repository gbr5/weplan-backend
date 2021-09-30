import { Router } from 'express';

import CreateMultipleTaskFollowersController from '@modules/tasks/infra/http/controllers/CreateMultipleTaskFollowersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createMultipleTaskFollowersRouter = Router();
const createMultipleTaskFollowersController = new CreateMultipleTaskFollowersController();

createMultipleTaskFollowersRouter.use(ensureAuthenticated);

createMultipleTaskFollowersRouter.post(
  '/',
  createMultipleTaskFollowersController.create,
);

export default createMultipleTaskFollowersRouter;
