import { Router } from 'express';

import UserManagementModuleController from '@modules/users/infra/http/controllers/UserManagementModulesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userManagementModuleRouter = Router();
const userManagementModuleController = new UserManagementModuleController();

// === $$ === $ ==> Employee Confirmation <== $ === $$ === //

userManagementModuleRouter.post(
  '/',
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
