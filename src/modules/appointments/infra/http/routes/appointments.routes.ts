import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import SupplierNonUserAppointmentsController from '@modules/appointments/infra/http/controllers/SupplierNonUserAppointmentsController';
import WeplanUsersAppointmentsController from '@modules/appointments/infra/http/controllers/WeplanUsersAppointmentsController';
import SupplierWeekDayAppointmentsController from '@modules/appointments/infra/http/controllers/SupplierWeekDayAppointmentsController';
import SupplierAppointmentDaysOffController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDaysOffController';
import SupplierAppointmentDaySchedulesController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDaySchedulesController';
import SupplierAppointmentDayIntervalsController from '@modules/appointments/infra/http/controllers/SupplierAppointmentDayIntervalsController';
import AppointmentTypesController from '@modules/appointments/infra/http/controllers/AppointmentTypesController';
import NonUserAppointmentGuestsController from '@modules/appointments/infra/http/controllers/NonUserAppointmentGuestsController';
import WeplanAppointmentGuestsController from '@modules/appointments/infra/http/controllers/WeplanAppointmentGuestsController';
import EventAppointmentsController from '@modules/appointments/infra/http/controllers/EventAppointmentsController';
import StageCardAppointmentsController from '@modules/appointments/infra/http/controllers/StageCardAppointmentsController';

import SupplierAppointmentController from '@modules/appointments/infra/http/controllers/SupplierAppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const supplierNonUserAppointmentsController = new SupplierNonUserAppointmentsController();
const weplanUsersAppointmentsController = new WeplanUsersAppointmentsController();
const supplierWeekDayAppointmentsController = new SupplierWeekDayAppointmentsController();
const supplierAppointmentController = new SupplierAppointmentController();
const supplierAppointmentDaysOffController = new SupplierAppointmentDaysOffController();
const supplierAppointmentDaySchedulesController = new SupplierAppointmentDaySchedulesController();
const supplierAppointmentDayIntervalsController = new SupplierAppointmentDayIntervalsController();
const appointmentTypesController = new AppointmentTypesController();
const nonUserAppointmentGuestsController = new NonUserAppointmentGuestsController();
const weplanAppointmentGuestsController = new WeplanAppointmentGuestsController();
const eventAppointmentsController = new EventAppointmentsController();
const stageCardAppointmentsController = new StageCardAppointmentsController();

// const supplierAppointmentController = new SupplierAppointmentController();

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

appointmentsRouter.get('/types', appointmentTypesController.index);

// === Appointment === //

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      date: Joi.date(),
      address: Joi.string().required(),
      appointment_type: Joi.string().required(),
      weplanGuest: Joi.boolean().required(),
      guest: Joi.boolean().required(),
      duration_minutes: Joi.number().required(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      date: Joi.date(),
      address: Joi.string().required(),
      appointment_type: Joi.string().required(),
      weplanGuest: Joi.boolean().required(),
      guest: Joi.boolean().required(),
      duration_minutes: Joi.number().required(),
    },
  }),
  appointmentsController.update,
);

appointmentsRouter.delete('/:id', appointmentsController.delete);

appointmentsRouter.get('/my-appointments', supplierAppointmentController.index);

// === Supplier Appointment's, with a non User Guest === //

appointmentsRouter.post(
  '/non-user-guests',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      date: Joi.date(),
      duration_minutes: Joi.number().required(),
      address: Joi.string().required(),
      appointment_type: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  supplierNonUserAppointmentsController.create,
);

// === Supplier Appointment's, with a non User Guest === //

appointmentsRouter.post(
  '/weplan-guests',
  weplanUsersAppointmentsController.create,
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

// === Non User Appointment Guests === //

appointmentsRouter.post(
  '/non-user-guests/guest',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      description: Joi.string().required(),
      appointment_id: Joi.string().required(),
    },
  }),
  nonUserAppointmentGuestsController.create,
);

appointmentsRouter.get(
  '/non-user-guests',
  nonUserAppointmentGuestsController.index,
);

appointmentsRouter.delete(
  '/non-user-guests/:id',
  nonUserAppointmentGuestsController.delete,
);

// === Weplan Appointment Guests === //

appointmentsRouter.post(
  '/weplan-guests/guest',
  celebrate({
    [Segments.BODY]: {
      appointment_id: Joi.string().required(),
      guest_id: Joi.string().required(),
    },
  }),
  weplanAppointmentGuestsController.create,
);

appointmentsRouter.get(
  '/weplan-guests',
  weplanAppointmentGuestsController.index,
);

appointmentsRouter.delete(
  '/weplan-guests/:id',
  weplanAppointmentGuestsController.delete,
);

// === Event Appointments === //

appointmentsRouter.post(
  '/event-appointments',
  celebrate({
    [Segments.BODY]: {
      appointment_id: Joi.string().required(),
      event_id: Joi.string().required(),
    },
  }),
  eventAppointmentsController.create,
);

appointmentsRouter.get(
  '/event-appointments',
  eventAppointmentsController.index,
);

appointmentsRouter.delete(
  '/event-appointments/:id',
  eventAppointmentsController.delete,
);

// === Stage Card Appointments === //

appointmentsRouter.post(
  '/card-appointments',
  celebrate({
    [Segments.BODY]: {
      appointment_id: Joi.string().required(),
      card_id: Joi.string().required(),
    },
  }),
  stageCardAppointmentsController.create,
);

appointmentsRouter.get(
  '/card-appointments',
  stageCardAppointmentsController.index,
);

appointmentsRouter.delete(
  '/card-appointments/:id',
  stageCardAppointmentsController.delete,
);
export default appointmentsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
