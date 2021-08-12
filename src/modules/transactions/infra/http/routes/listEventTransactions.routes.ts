import { Router } from 'express';

import ListEventTransactionsController from '@modules/transactions/infra/http/controllers/ListEventTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listEventTransactionsRouter = Router();
const listEventTransactionsController = new ListEventTransactionsController();

listEventTransactionsRouter.get(
  '/:event_id',
  ensureAuthenticated,
  listEventTransactionsController.index,
);

export default listEventTransactionsRouter;
