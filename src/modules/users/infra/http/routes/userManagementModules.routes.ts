import { Router } from 'express';

import UserManagementModuleController from '@modules/users/infra/http/controllers/UserManagementModulesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const userManagementModuleRouter = Router();
const userManagementModuleController = new UserManagementModuleController();

// === $$ === $ ==> Employee Confirmation <== $ === $$ === //

userManagementModuleRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      management_module: Joi.string().required(),
      access_level: Joi.number().required(),
    },
  }),
  ensureAuthenticated,
  userManagementModuleController.create,
);
userManagementModuleRouter.put(
  '/:id',
  ensureAuthenticated,
  userManagementModuleController.update,
);
userManagementModuleRouter.get(
  '/:user_id',
  userManagementModuleController.list,
);
userManagementModuleRouter.delete(
  '/:id',
  ensureAuthenticated,
  userManagementModuleController.delete,
);

export default userManagementModuleRouter;
