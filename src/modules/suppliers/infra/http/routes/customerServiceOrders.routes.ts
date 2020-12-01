import { Router } from 'express';

import CustomerServiceOrdersController from '@modules/suppliers/infra/http/controllers/CustomerServiceOrdersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const customerServiceOrdersRouter = Router();
const customerServiceOrdersController = new CustomerServiceOrdersController();

// === $$ === $ ==> Customer Service Order <== $ === $$ === //

customerServiceOrdersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      company_id: Joi.string().required(),
      title: Joi.string().required(),
      message: Joi.string().required(),
      isResponded: Joi.boolean().required(),
    },
  }),
  ensureAuthenticated,
  customerServiceOrdersController.create,
);
customerServiceOrdersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      isResponded: Joi.boolean().required(),
    },
  }),
  ensureAuthenticated,
  customerServiceOrdersController.update,
);
customerServiceOrdersRouter.get(
  '/:company_id',
  ensureAuthenticated,
  customerServiceOrdersController.listCompanyServiceOrder,
);
customerServiceOrdersRouter.get(
  '/customer/:customer_id',
  ensureAuthenticated,
  customerServiceOrdersController.listCustomerServiceOrder,
);
customerServiceOrdersRouter.delete(
  '/:id',
  ensureAuthenticated,
  customerServiceOrdersController.delete,
);

export default customerServiceOrdersRouter;
