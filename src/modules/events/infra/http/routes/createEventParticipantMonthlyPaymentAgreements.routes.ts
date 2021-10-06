import { Router } from 'express';

import CreateEventParticipantMonthlyPaymentAgreementsController from '@modules/events/infra/http/controllers/CreateEventParticipantMonthlyPaymentAgreementsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createEventParticipantMonthlyPaymentAgreementsRouter = Router();
const createEventParticipantMonthlyPaymentAgreementsController = new CreateEventParticipantMonthlyPaymentAgreementsController();

createEventParticipantMonthlyPaymentAgreementsRouter.use(ensureAuthenticated);

createEventParticipantMonthlyPaymentAgreementsRouter.post(
  '/',
  createEventParticipantMonthlyPaymentAgreementsController.create,
);

export default createEventParticipantMonthlyPaymentAgreementsRouter;
