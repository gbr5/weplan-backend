import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardCustomerServiceOrderController from '@modules/suppliers/infra/http/controllers/CardCustomerServiceOrdersController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardCustomerServiceOrdersRouter = Router();
const cardCustomerServiceOrderController = new CardCustomerServiceOrderController();

cardCustomerServiceOrdersRouter.use(ensureAuthenticated);

// === Card Customer Service Orders === //

cardCustomerServiceOrdersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_service_order_id: Joi.string().required(),
      card_unique_name: Joi.string().required(),
    },
  }),
  cardCustomerServiceOrderController.create,
);

cardCustomerServiceOrdersRouter.get(
  '/:card_unique_name',
  cardCustomerServiceOrderController.index,
);

cardCustomerServiceOrdersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      card_unique_name: Joi.string().required(),
    },
  }),
  cardCustomerServiceOrderController.update,
);

cardCustomerServiceOrdersRouter.delete(
  '/:id',
  cardCustomerServiceOrderController.delete,
);

export default cardCustomerServiceOrdersRouter;
