import { Router } from 'express';

import CreateAppointmentWPParticipantsController from '@modules/appointments/infra/http/controllers/CreateAppointmentWPParticipantsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentWPParticipantsRouter = Router();
const appointmentWPParticipantsController = new CreateAppointmentWPParticipantsController();

appointmentWPParticipantsRouter.use(ensureAuthenticated);

appointmentWPParticipantsRouter.post(
  '/',
  appointmentWPParticipantsController.create,
);

export default appointmentWPParticipantsRouter;
