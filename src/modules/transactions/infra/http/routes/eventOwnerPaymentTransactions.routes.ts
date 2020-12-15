import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventOwnerPaymentTransactionController from '@modules/transactions/infra/http/controllers/EventOwnerPaymentTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventOwnerPaymentTransactionRouter = Router();
const eventOwnerPaymentTransactionController = new EventOwnerPaymentTransactionController();

eventOwnerPaymentTransactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      main_transaction_id: Joi.string().required(),
      payment_id: Joi.string().required(),
      transaction_type: Joi.string().required(),
    },
  }),
  eventOwnerPaymentTransactionController.create,
);
eventOwnerPaymentTransactionRouter.get(
  '/:payment_id',
  eventOwnerPaymentTransactionController.index,
);
eventOwnerPaymentTransactionRouter.delete(
  '/:id',
  eventOwnerPaymentTransactionController.delete,
);

eventOwnerPaymentTransactionRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      transaction_type: Joi.string().required(),
    },
  }),
  eventOwnerPaymentTransactionController.update,
);

export default eventOwnerPaymentTransactionRouter;
