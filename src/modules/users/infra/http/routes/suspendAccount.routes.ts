import { Router } from 'express';

import SuspendAccountController from '@modules/users/infra/http/controllers/SuspendAccountController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const suspendAccountRouter = Router();
const activationUserController = new SuspendAccountController();

suspendAccountRouter.put(
  '/:user_id',
  ensureAuthenticated,
  activationUserController.update,
);

export default suspendAccountRouter;
