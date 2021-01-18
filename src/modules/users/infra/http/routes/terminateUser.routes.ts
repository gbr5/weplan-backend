import { Router } from 'express';

import TerminateUserController from '@modules/users/infra/http/controllers/TerminateUserController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const terminateUserRouter = Router();
const terminateUserController = new TerminateUserController();

terminateUserRouter.delete(
  '/:user_id',
  ensureAuthenticated,
  terminateUserController.delete,
);

export default terminateUserRouter;
