import { Router } from 'express';

import DeleteUserController from '@modules/users/infra/http/controllers/DeleteUserController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const deleteUserRouter = Router();
const deleteUserController = new DeleteUserController();

deleteUserRouter.put(
  '/:user_id',
  ensureAuthenticated,
  deleteUserController.update,
);

export default deleteUserRouter;
