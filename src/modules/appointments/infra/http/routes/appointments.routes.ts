import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentController from '@modules/appointments/infra/http/controllers/ProviderAppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentController = new ProviderAppointmentController();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.get(
  '/my-daily-appointments',
  providerAppointmentController.index,
);

export default appointmentsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
