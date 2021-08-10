import { Router } from 'express';

import TransactionNotesController from '@modules/notes/infra/http/controllers/TransactionNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const transactionNotesRouter = Router();
const transactionController = new TransactionNotesController();

transactionNotesRouter.post(
  '/',
  ensureAuthenticated,
  transactionController.create,
);

transactionNotesRouter.get(
  '/:transaction_id',
  ensureAuthenticated,
  transactionController.list,
);
transactionNotesRouter.delete(
  '/:id',
  ensureAuthenticated,
  transactionController.delete,
);

export default transactionNotesRouter;
