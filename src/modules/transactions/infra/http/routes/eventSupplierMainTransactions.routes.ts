import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventSupplierMainTransactionController from '@modules/transactions/infra/http/controllers/EventSupplierMainTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventSupplierMainTransactionRouter = Router();
const eventSupplierMainTransactionController = new EventSupplierMainTransactionController();

eventSupplierMainTransactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      main_transaction_id: Joi.string().required(),
      agreement_transaction_id: Joi.string().required(),
      transaction_type: Joi.string().required(),
    },
  }),
  eventSupplierMainTransactionController.create,
);
eventSupplierMainTransactionRouter.get(
  '/:agreement_transaction_id',
  eventSupplierMainTransactionController.index,
);
eventSupplierMainTransactionRouter.delete(
  '/:id',
  eventSupplierMainTransactionController.delete,
);

eventSupplierMainTransactionRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      transaction_type: Joi.string().required(),
    },
  }),
  eventSupplierMainTransactionController.update,
);

export default eventSupplierMainTransactionRouter;
