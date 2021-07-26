import { Router } from 'express';

import DeleteEventSupplierTransactionAgreementsController from '@modules/transactions/infra/http/controllers/DeleteEventSupplierTransactionAgreementsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const deleteEventSupplierTransactionAgreementsRouter = Router();
const deleteEventSupplierTransactionAgreementsController = new DeleteEventSupplierTransactionAgreementsController();

deleteEventSupplierTransactionAgreementsRouter.delete(
  '/:supplier_id',
  ensureAuthenticated,
  deleteEventSupplierTransactionAgreementsController.delete,
);

export default deleteEventSupplierTransactionAgreementsRouter;
