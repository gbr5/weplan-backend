import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import WeplanManagementModulesController from '@modules/suppliers/infra/http/controllers/WeplanManagementModulesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const weplanManagementModulesRouter = Router();
const weplanManagementModulesController = new WeplanManagementModulesController();

weplanManagementModulesRouter.use(ensureAuthenticated);

weplanManagementModulesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  weplanManagementModulesController.create,
);

weplanManagementModulesRouter.get('/', weplanManagementModulesController.index);

weplanManagementModulesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  weplanManagementModulesController.update,
);
weplanManagementModulesRouter.delete(
  '/:id',
  weplanManagementModulesController.delete,
);

export default weplanManagementModulesRouter;
