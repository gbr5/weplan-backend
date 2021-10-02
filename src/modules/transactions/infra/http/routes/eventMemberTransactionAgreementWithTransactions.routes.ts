import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import CreateEventMemberTransactionAgreementWithTransactionsController from '@modules/transactions/infra/http/controllers/CreateEventMemberTransactionAgreementWithTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
// import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

const createEventMemberTransactionAgreementWithTransactionsRouter = Router();
const createEventMemberTransactionAgreementWithTransactionsController = new CreateEventMemberTransactionAgreementWithTransactionsController();

createEventMemberTransactionAgreementWithTransactionsRouter.post(
  '/',
  ensureAuthenticated,
  createEventMemberTransactionAgreementWithTransactionsController.create,
);

export default createEventMemberTransactionAgreementWithTransactionsRouter;
