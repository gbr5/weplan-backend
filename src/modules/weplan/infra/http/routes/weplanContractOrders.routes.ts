import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import WeplanContractOrdersController from '@modules/weplan/infra/http/controllers/WeplanContractOrdersController';
import WeplanContractOrderProductsController from '@modules/weplan/infra/http/controllers/WeplanContractOrderProductsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const weplanContractOrdersRouter = Router();
const weplanContractOrdersController = new WeplanContractOrdersController();
const weplanContractOrderProductsController = new WeplanContractOrderProductsController();

weplanContractOrdersRouter.post(
  '/',
  ensureAuthenticated,
  weplanContractOrdersController.create,
);

weplanContractOrdersRouter.get(
  '/:user_id',
  weplanContractOrdersController.index,
);

weplanContractOrdersRouter.delete(
  '/:id',
  ensureAuthenticated,
  weplanContractOrdersController.delete,
);

// $$ ==> ORDER'S PRODUCTS

weplanContractOrdersRouter.post(
  '/products/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      contract_order_id: Joi.string().required(),
      weplan_product_id: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  weplanContractOrderProductsController.create,
);

weplanContractOrdersRouter.get(
  '/products/:contract_order_id',
  weplanContractOrderProductsController.index,
);

weplanContractOrdersRouter.delete(
  '/products/:id',
  weplanContractOrderProductsController.delete,
);

export default weplanContractOrdersRouter;
