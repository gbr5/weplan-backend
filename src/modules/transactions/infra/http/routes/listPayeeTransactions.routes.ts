import { Router } from 'express';

import ListPayeeTransactionsController from '@modules/transactions/infra/http/controllers/ListPayeeTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listPayeeTransactionsRouter = Router();
const listPayeeTransactionsController = new ListPayeeTransactionsController();

listPayeeTransactionsRouter.get(
  '/:payee_id',
  ensureAuthenticated,
  listPayeeTransactionsController.index,
);

export default listPayeeTransactionsRouter;
