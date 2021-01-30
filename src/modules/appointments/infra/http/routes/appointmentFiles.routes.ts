import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentFilesController from '@modules/appointments/infra/http/controllers/AppointmentFilesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentFilesRouter = Router();
const appointmentFilesController = new AppointmentFilesController();

appointmentFilesRouter.use(ensureAuthenticated);

appointmentFilesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      file_id: Joi.string().required(),
      appointment_id: Joi.string().required(),
    },
  }),
  appointmentFilesController.create,
);

appointmentFilesRouter.get(
  '/:appointment_id',
  appointmentFilesController.index,
);

appointmentFilesRouter.delete('/:id', appointmentFilesController.delete);

export default appointmentFilesRouter;
