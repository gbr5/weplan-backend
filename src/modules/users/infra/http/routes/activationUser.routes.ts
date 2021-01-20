import { Router } from 'express';

import ActivationUserController from '@modules/users/infra/http/controllers/ActivationUserController';

const activationUsersRouter = Router();
const activationUserController = new ActivationUserController();

activationUsersRouter.post('/', activationUserController.create);
activationUsersRouter.put('/:token', activationUserController.update);

export default activationUsersRouter;
