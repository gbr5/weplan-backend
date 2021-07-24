import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import CreateEventSupplierTransactionAgreementWithTransactionsController from '@modules/transactions/infra/http/controllers/CreateEventSupplierTransactionAgreementWithTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

const createEventSupplierTransactionAgreementWithTransactionsRouter = Router();
const createEventSupplierTransactionAgreementWithTransactionsController = new CreateEventSupplierTransactionAgreementWithTransactionsController();

createEventSupplierTransactionAgreementWithTransactionsRouter.post(
  '/',
  ensureAuthenticated,
  createEventSupplierTransactionAgreementWithTransactionsController.create,
);

export default createEventSupplierTransactionAgreementWithTransactionsRouter;
