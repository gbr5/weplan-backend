import { Router } from 'express';

import EventOwnerTransactionAgreementsController from '@modules/transactions/infra/http/controllers/EventOwnerTransactionAgreementsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventOwnerTransactionAgreementsRouter = Router();
const eventOwnerTransactionAgreementsController = new EventOwnerTransactionAgreementsController();

eventOwnerTransactionAgreementsRouter.post(
  '/',
  ensureAuthenticated,
  eventOwnerTransactionAgreementsController.create,
);
eventOwnerTransactionAgreementsRouter.put(
  '/',
  ensureAuthenticated,
  eventOwnerTransactionAgreementsController.update,
);
eventOwnerTransactionAgreementsRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventOwnerTransactionAgreementsController.delete,
);
eventOwnerTransactionAgreementsRouter.get(
  '/:owner_id',
  ensureAuthenticated,
  eventOwnerTransactionAgreementsController.index,
);

export default eventOwnerTransactionAgreementsRouter;
