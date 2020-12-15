import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventMemberPaymentTransactionController from '@modules/transactions/infra/http/controllers/EventMemberPaymentTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMemberPaymentTransactionRouter = Router();
const eventMemberPaymentTransactionController = new EventMemberPaymentTransactionController();

eventMemberPaymentTransactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      main_transaction_id: Joi.string().required(),
      payment_id: Joi.string().required(),
      transaction_type: Joi.string().required(),
    },
  }),
  eventMemberPaymentTransactionController.create,
);
eventMemberPaymentTransactionRouter.get(
  '/:payment_id',
  eventMemberPaymentTransactionController.index,
);
eventMemberPaymentTransactionRouter.delete(
  '/:id',
  eventMemberPaymentTransactionController.delete,
);

eventMemberPaymentTransactionRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      transaction_type: Joi.string().required(),
    },
  }),
  eventMemberPaymentTransactionController.update,
);

export default eventMemberPaymentTransactionRouter;
