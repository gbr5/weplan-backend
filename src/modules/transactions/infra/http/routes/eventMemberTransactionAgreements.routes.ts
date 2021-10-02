import { Router } from 'express';

import EventMemberTransactionAgreementsController from '@modules/transactions/infra/http/controllers/EventMemberTransactionAgreementsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMemberTransactionAgreementsRouter = Router();
const eventMemberTransactionAgreementsController = new EventMemberTransactionAgreementsController();

eventMemberTransactionAgreementsRouter.post(
  '/',
  ensureAuthenticated,
  eventMemberTransactionAgreementsController.create,
);
eventMemberTransactionAgreementsRouter.put(
  '/',
  ensureAuthenticated,
  eventMemberTransactionAgreementsController.update,
);
eventMemberTransactionAgreementsRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventMemberTransactionAgreementsController.delete,
);
eventMemberTransactionAgreementsRouter.get(
  '/:member_id',
  ensureAuthenticated,
  eventMemberTransactionAgreementsController.index,
);

export default eventMemberTransactionAgreementsRouter;
