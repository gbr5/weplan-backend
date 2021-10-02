import { Router } from 'express';

import EventOwnerTransactionsController from '@modules/transactions/infra/http/controllers/EventOwnerTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventOwnerTransactionsRouter = Router();
const eventOwnerTransactionsController = new EventOwnerTransactionsController();

eventOwnerTransactionsRouter.post(
  '/',
  ensureAuthenticated,
  eventOwnerTransactionsController.create,
);

eventOwnerTransactionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventOwnerTransactionsController.delete,
);
eventOwnerTransactionsRouter.get(
  '/:agreement_id',
  ensureAuthenticated,
  eventOwnerTransactionsController.index,
);

export default eventOwnerTransactionsRouter;
