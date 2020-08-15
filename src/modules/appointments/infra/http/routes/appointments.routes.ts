import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import SupplierWeekDayAppointmentsController from '@modules/appointments/infra/http/controllers/SupplierWeekDayAppointmentsController';
import SupplierAppointmentDaysOffController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDaysOffController';
import SupplierAppointmentDaySchedulesController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDaySchedulesController';
import SupplierAppointmentDayIntervalsController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDayIntervalsController';
import AppointmentTypesController from '@modules/appointments/infra/http/controllers/AppointmentTypesController';

import SupplierAppointmentController from '@modules/appointments/infra/http/controllers/SupplierAppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const supplierWeekDayAppointmentsController = new SupplierWeekDayAppointmentsController();
const supplierAppointmentDaysOffController = new SupplierAppointmentDaysOffController();
const supplierAppointmentDaySchedulesController = new SupplierAppointmentDaySchedulesController();
const supplierAppointmentDayIntervalsController = new SupplierAppointmentDayIntervalsController();
const appointmentTypesController = new AppointmentTypesController();

const supplierAppointmentController = new SupplierAppointmentController();
appointmentsRouter.use(ensureAuthenticated);

// === Appointment Types === //

appointmentsRouter.post(
  '/types',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  appointmentTypesController.create,
);

// === Appointment === //

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      date: Joi.date(),
      address: Joi.string().required(),
      host_id: Joi.string().uuid().required(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.delete('/:id', appointmentsController.delete);

appointmentsRouter.get(
  '/my-daily-appointments',
  supplierAppointmentController.index,
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

// === Supplier Appointment Day Schedule === //

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

// === Supplier Appointment Day Intervals === //

appointmentsRouter.post(
  '/day-interval/',
  celebrate({
    [Segments.BODY]: {
      start_hour: Joi.number().required(),
      start_minutes: Joi.number().required(),
      duration_minutes: Joi.number().required(),
      week_day_id: Joi.string().required(),
    },
  }),
  supplierAppointmentDayIntervalsController.create,
);

appointmentsRouter.put(
  '/day-interval/:id',
  celebrate({
    [Segments.BODY]: {
      start_hour: Joi.number().required(),
      start_minutes: Joi.number().required(),
      duration_minutes: Joi.number().required(),
    },
  }),
  supplierAppointmentDayIntervalsController.update,
);

appointmentsRouter.get(
  '/day-interval/',
  supplierAppointmentDayIntervalsController.index,
);

appointmentsRouter.delete(
  '/day-interval/:id',
  supplierAppointmentDayIntervalsController.delete,
);

export default appointmentsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
