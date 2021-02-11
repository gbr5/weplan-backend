import { Router } from 'express';

import AppointmentRemindersController from '@modules/appointments/infra/http/controllers/AppointmentRemindersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRemindersRouter = Router();
const appointmentRemindersController = new AppointmentRemindersController();

appointmentRemindersRouter.use(ensureAuthenticated);

appointmentRemindersRouter.post('/', appointmentRemindersController.create);

appointmentRemindersRouter.put('/:id', appointmentRemindersController.update);

appointmentRemindersRouter.delete(
  '/:id',
  appointmentRemindersController.delete,
);

export default appointmentRemindersRouter;
