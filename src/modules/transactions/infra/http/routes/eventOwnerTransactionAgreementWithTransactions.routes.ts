import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import CreateEventOwnerTransactionAgreementWithTransactionsController from '@modules/transactions/infra/http/controllers/CreateEventOwnerTransactionAgreementWithTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

const createEventOwnerTransactionAgreementWithTransactionsRouter = Router();
const createEventOwnerTransactionAgreementWithTransactionsController = new CreateEventOwnerTransactionAgreementWithTransactionsController();

createEventOwnerTransactionAgreementWithTransactionsRouter.post(
  '/',
  ensureAuthenticated,
  createEventOwnerTransactionAgreementWithTransactionsController.create,
);

export default createEventOwnerTransactionAgreementWithTransactionsRouter;
