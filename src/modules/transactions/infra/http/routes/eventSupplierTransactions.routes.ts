import { Router } from 'express';

import EventSupplierTransactionsController from '@modules/transactions/infra/http/controllers/EventSupplierTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventSupplierTransactionsRouter = Router();
const eventSupplierTransactionsController = new EventSupplierTransactionsController();

eventSupplierTransactionsRouter.post(
  '/',
  ensureAuthenticated,
  eventSupplierTransactionsController.create,
);

eventSupplierTransactionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventSupplierTransactionsController.delete,
);
eventSupplierTransactionsRouter.get(
  '/:agreement_id',
  ensureAuthenticated,
  eventSupplierTransactionsController.index,
);

export default eventSupplierTransactionsRouter;
