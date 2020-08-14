import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import SupplierWeekDayAppointmentsController from '@modules/appointments/infra/http/controllers/SupplierWeekDayAppointmentsController';
import SupplierAppointmentDaysOffController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDaysOffController';
import ProviderAppointmentController from '@modules/appointments/infra/http/controllers/ProviderAppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const supplierWeekDayAppointmentsController = new SupplierWeekDayAppointmentsController();
const supplierAppointmentDaysOffController = new SupplierAppointmentDaysOffController();
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

// === Supplier Week Day Appointments === //

appointmentsRouter.post(
  '/week-day/',
  celebrate({
    [Segments.BODY]: {
      week_day: Joi.string(),
    },
  }),
  supplierWeekDayAppointmentsController.create,
);

appointmentsRouter.get(
  '/week-day/',
  supplierWeekDayAppointmentsController.index,
);

appointmentsRouter.delete(
  '/week-day/:id',
  supplierWeekDayAppointmentsController.delete,
);

// === Supplier Appointment Days Off === //

appointmentsRouter.post(
  '/day-off/',
  celebrate({
    [Segments.BODY]: {
      day_off: Joi.date(),
    },
  }),
  supplierAppointmentDaysOffController.create,
);

appointmentsRouter.get('/day-off/', supplierAppointmentDaysOffController.index);

appointmentsRouter.delete(
  '/day-off/:id',
  supplierAppointmentDaysOffController.delete,
);
export default appointmentsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
