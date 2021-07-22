import { Router } from 'express';

import EventSupplierTransactionAgreementsController from '@modules/transactions/infra/http/controllers/EventSupplierTransactionAgreementsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventSupplierTransactionAgreementsRouter = Router();
const eventSupplierTransactionAgreementsController = new EventSupplierTransactionAgreementsController();

eventSupplierTransactionAgreementsRouter.post(
  '/',
  ensureAuthenticated,
  eventSupplierTransactionAgreementsController.create,
);
eventSupplierTransactionAgreementsRouter.put(
  '/',
  ensureAuthenticated,
  eventSupplierTransactionAgreementsController.update,
);
eventSupplierTransactionAgreementsRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventSupplierTransactionAgreementsController.delete,
);
eventSupplierTransactionAgreementsRouter.get(
  '/:supplier_id',
  ensureAuthenticated,
  eventSupplierTransactionAgreementsController.index,
);

export default eventSupplierTransactionAgreementsRouter;
