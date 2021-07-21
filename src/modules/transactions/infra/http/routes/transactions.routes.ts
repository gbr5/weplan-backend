import { Router } from 'express';

import TransactionsController from '@modules/transactions/infra/http/controllers/TransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.post(
  '/',
  ensureAuthenticated,
  transactionsController.create,
);
transactionsRouter.put('/', ensureAuthenticated, transactionsController.update);
transactionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  transactionsController.delete,
);

export default transactionsRouter;
