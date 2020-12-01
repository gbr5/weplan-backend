import { Router } from 'express';

import CustomerServiceOrderFieldAnswersController from '@modules/suppliers/infra/http/controllers/CustomerServiceOrderFieldAnswersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const customerServiceOrderFieldAnswersRouter = Router();
const customerServiceOrderFieldAnswersController = new CustomerServiceOrderFieldAnswersController();

// === $$ === $ ==> Customer Service Order <== $ === $$ === //

customerServiceOrderFieldAnswersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_default_service_order_field_id: Joi.string().required(),
      customer_service_order_id: Joi.string().required(),
      answer: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  customerServiceOrderFieldAnswersController.create,
);
customerServiceOrderFieldAnswersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      answer: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  customerServiceOrderFieldAnswersController.update,
);
customerServiceOrderFieldAnswersRouter.get(
  '/:customer_service_order_id',
  ensureAuthenticated,
  customerServiceOrderFieldAnswersController.index,
);
customerServiceOrderFieldAnswersRouter.delete(
  '/:id',
  ensureAuthenticated,
  customerServiceOrderFieldAnswersController.delete,
);

export default customerServiceOrderFieldAnswersRouter;
