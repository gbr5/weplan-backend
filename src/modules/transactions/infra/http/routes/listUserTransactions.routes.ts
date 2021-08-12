import { Router } from 'express';

import ListUserTransactionsController from '@modules/transactions/infra/http/controllers/ListUserTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listUserTransactionsRouter = Router();
const listUserTransactionsController = new ListUserTransactionsController();

listUserTransactionsRouter.get(
  '/:user_id',
  ensureAuthenticated,
  listUserTransactionsController.index,
);

export default listUserTransactionsRouter;
