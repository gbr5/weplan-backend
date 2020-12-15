import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventTransactionController from '@modules/transactions/infra/http/controllers/EventTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventTransactionRouter = Router();
const eventTransactionController = new EventTransactionController();

eventTransactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      main_transaction_id: Joi.string().required(),
      event_id: Joi.string().required(),
      transaction_type: Joi.string().required(),
      weplanUser: Joi.string().required(),
      weplanUserType: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  eventTransactionController.create,
);
eventTransactionRouter.get('/:event_id', eventTransactionController.index);
eventTransactionRouter.delete('/:id', eventTransactionController.delete);

eventTransactionRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      transaction_type: Joi.string().required(),
      weplanUser: Joi.string().required(),
      weplanUserType: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  eventTransactionController.update,
);

export default eventTransactionRouter;
