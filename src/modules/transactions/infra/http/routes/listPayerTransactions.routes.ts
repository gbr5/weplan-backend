import { Router } from 'express';

import ListPayerTransactionsController from '@modules/transactions/infra/http/controllers/ListPayerTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listPayerTransactionsRouter = Router();
const listPayerTransactionsController = new ListPayerTransactionsController();

listPayerTransactionsRouter.get(
  '/:payer_id',
  ensureAuthenticated,
  listPayerTransactionsController.index,
);

export default listPayerTransactionsRouter;
