import { Router } from 'express';

import EventMonthlyPaymentAgreementsController from '@modules/events/infra/http/controllers/EventMonthlyPaymentAgreementsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMonthlyPaymentAgreementsRouter = Router();
const eventMonthlyPaymentAgreementsController = new EventMonthlyPaymentAgreementsController();

eventMonthlyPaymentAgreementsRouter.use(ensureAuthenticated);

eventMonthlyPaymentAgreementsRouter.get(
  '/:event_id',
  eventMonthlyPaymentAgreementsController.index,
);

export default eventMonthlyPaymentAgreementsRouter;
