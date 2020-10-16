import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import WeplanContractOrdersController from '@modules/weplan/infra/http/controllers/WeplanContractOrdersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const weplanContractOrdersRouter = Router();
const weplanContractOrdersController = new WeplanContractOrdersController();

weplanContractOrdersRouter.use(ensureAuthenticated);

weplanContractOrdersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
    },
  }),
  weplanContractOrdersController.create,
);

weplanContractOrdersRouter.get(
  '/:user_id',
  weplanContractOrdersController.index,
);

weplanContractOrdersRouter.delete(
  '/:id',
  weplanContractOrdersController.delete,
);

export default weplanContractOrdersRouter;
