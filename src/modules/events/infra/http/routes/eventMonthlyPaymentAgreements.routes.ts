import { Router } from 'express';

import EventMonthlyPaymentAgreementsController from '@modules/events/infra/http/controllers/EventMonthlyPaymentAgreementsController';
import DeleteEventMonthlyPaymentAgreementWithTransactionsController from '@modules/events/infra/http/controllers/DeleteEventMonthlyPaymentAgreementWithTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMonthlyPaymentAgreementsRouter = Router();
const eventMonthlyPaymentAgreementsController = new EventMonthlyPaymentAgreementsController();
const deleteEventMonthlyPaymentAgreementWithTransactionsController = new DeleteEventMonthlyPaymentAgreementWithTransactionsController();

eventMonthlyPaymentAgreementsRouter.use(ensureAuthenticated);

eventMonthlyPaymentAgreementsRouter.get(
  '/:event_id',
  eventMonthlyPaymentAgreementsController.index,
);
eventMonthlyPaymentAgreementsRouter.delete(
  '/:id',
  deleteEventMonthlyPaymentAgreementWithTransactionsController.delete,
);

export default eventMonthlyPaymentAgreementsRouter;
