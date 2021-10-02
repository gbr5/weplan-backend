import { Router } from 'express';

import EventMemberTransactionsController from '@modules/transactions/infra/http/controllers/EventMemberTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMemberTransactionsRouter = Router();
const eventMemberTransactionsController = new EventMemberTransactionsController();

eventMemberTransactionsRouter.post(
  '/',
  ensureAuthenticated,
  eventMemberTransactionsController.create,
);

eventMemberTransactionsRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventMemberTransactionsController.delete,
);
eventMemberTransactionsRouter.get(
  '/:agreement_id',
  ensureAuthenticated,
  eventMemberTransactionsController.index,
);

export default eventMemberTransactionsRouter;
