import { Router } from 'express';

import ActivationUserController from '@modules/users/infra/http/controllers/ActivationUserController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const activationUsersRouter = Router();
const activationUserController = new ActivationUserController();

activationUsersRouter.put(
  '/:user_id',
  ensureAuthenticated,
  activationUserController.update,
);

export default activationUsersRouter;
