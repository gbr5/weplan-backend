import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import SupplierWeekDayAppointmentsController from '@modules/appointments/infra/http/controllers/SupplierWeekDayAppointmentsController';
import SupplierAppointmentDaysOffController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDaysOffController';
import SupplierAppointmentDaySchedulesController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDaySchedulesController';

// import ProviderAppointmentController from '@modules/appointments/infra/http/controllers/ProviderAppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const supplierWeekDayAppointmentsController = new SupplierWeekDayAppointmentsController();
const supplierAppointmentDaysOffController = new SupplierAppointmentDaysOffController();
const supplierAppointmentDaySchedulesController = new SupplierAppointmentDaySchedulesController();

// const providerAppointmentController = new ProviderAppointmentController();
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

// appointmentsRouter.get(
//   '/my-daily-appointments',
//   providerAppointmentController.index,
// );

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

// === Supplier Appointment Days Off === //

appointmentsRouter.post(
  '/day-schedule/',
  celebrate({
    [Segments.BODY]: {
      start_hour: Joi.number().required(),
      end_hour: Joi.number().required(),
      duration_minutes: Joi.number().required(),
      interval: Joi.boolean().required(),
      week_day_id: Joi.string().required(),
    },
  }),
  supplierAppointmentDaySchedulesController.create,
);

appointmentsRouter.get(
  '/day-schedule/',
  supplierAppointmentDaySchedulesController.index,
);

appointmentsRouter.delete(
  '/day-schedule/:id',
  supplierAppointmentDaySchedulesController.delete,
);

export default appointmentsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
