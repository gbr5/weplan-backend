import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventsController from '@modules/events/infra/http/controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import HiredSuppliersController from '@modules/events/infra/http/controllers/HiredSuppliersController';
import EventWeplanSuppliersController from '@modules/events/infra/http/controllers/EventWeplanSuppliersController';
import UserCheckListsController from '@modules/events/infra/http/controllers/UserCheckListsController';
import HostGuestsController from '@modules/events/infra/http/controllers/HostGuestsController';
import EventPlannersController from '@modules/events/infra/http/controllers/EventPlannersController';
import EventInfosController from '@modules/events/infra/http/controllers/EventInfosController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import WeplanGuestConfirmationController from '../controllers/WeplanGuestConfirmationController';
import EventAvatarController from '../controllers/EventAvatarController';

const eventsRouter = Router();
const events = new EventsController();
const eventAvatar = new EventAvatarController();
const hiredSuppliers = new HiredSuppliersController();
const eventWeplanSuppliers = new EventWeplanSuppliersController();
const userCheckLists = new UserCheckListsController();
const hostGuests = new HostGuestsController();
const eventPlanners = new EventPlannersController();
const eventInfos = new EventInfosController();
const weplanGuestConfirmation = new WeplanGuestConfirmationController();
const upload = multer(uploadConfig.multer);

eventsRouter.use(ensureAuthenticated);

eventsRouter.get('/', events.index);
eventsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      event_type: Joi.string().required(),
      date: Joi.date(),
      isDateDefined: Joi.boolean(),
    },
  }),
  events.create,
);
eventsRouter.get('/:event_id', events.show);
eventsRouter.get('/by-name/:trimmed_name', events.showByName);

eventsRouter.put(
  '/:event_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      date: Joi.date(),
      isNumberOfGuestsRestricted: Joi.boolean(),
      isPublished: Joi.boolean(),
      number_of_guests: Joi.number(),
      members_number_of_guests: Joi.number(),
    },
  }),
  events.update,
);
eventsRouter.put(
  '/name/:event_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  events.updateName,
);

eventsRouter.delete('/:event_id', events.delete);

eventsRouter.patch(
  '/avatar/:event_id',
  ensureAuthenticated,
  upload.single('avatar'),
  eventAvatar.update,
);

// === Hired Suppliers === //

eventsRouter.get('/hired-suppliers/:event_id', hiredSuppliers.index);

// === Selected & Hired WEPLAN Suppliers === //

eventsRouter.post(
  '/:event_id/event-weplan-suppliers',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      event_supplier_id: Joi.string().required(),
    },
  }),
  eventWeplanSuppliers.create,
);

eventsRouter.get(
  '/:event_id/event-weplan-suppliers',
  eventWeplanSuppliers.index,
);

eventsRouter.get(
  '/event-weplan-supplier/:event_id/:event_supplier_id',
  eventWeplanSuppliers.show,
);

// === User Check List === //

eventsRouter.post(
  '/:event_id/check-list',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      priority_level: Joi.number().required(),
      status: Joi.number().required(),
      due_date: Joi.date(),
    },
  }),
  userCheckLists.create,
);
eventsRouter.get('/:event_id/check-list', userCheckLists.index);

eventsRouter.put(
  '/check-list/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      priority_level: Joi.number().required(),
      due_date: Joi.date().required(),
    },
  }),
  userCheckLists.update,
);

eventsRouter.put(
  '/check-list/:id/status',
  celebrate({
    [Segments.BODY]: {
      status: Joi.number().required(),
    },
  }),
  userCheckLists.updateStatus,
);

eventsRouter.put(
  '/check-list/:id/priority-level',
  celebrate({
    [Segments.BODY]: {
      priority_level: Joi.number().required(),
    },
  }),
  userCheckLists.updatePriorityLevel,
);

eventsRouter.delete('/check-list/:id', userCheckLists.delete);

// === Guests & Hosts Guests === //

eventsRouter.put(
  '/weplan-user-guest/:id',
  weplanGuestConfirmation.updateWeplanGuest,
);

eventsRouter.get('/:event_id/guests/:host_id', hostGuests.index);

// === Event Planners === //

eventsRouter.post(
  '/:event_id/event-planner',
  celebrate({
    [Segments.BODY]: {
      planner_id: Joi.string().required(),
    },
  }),
  eventPlanners.create,
);

eventsRouter.delete(
  '/:event_id/event-planner/:planner_id',
  eventPlanners.delete,
);
eventsRouter.get('/:event_id/event-planner/', eventPlanners.index);

// === Event Info === //

eventsRouter.post(
  '/:event_id/event-info',
  // celebrate({
  //   [Segments.BODY]: {
  //     number_of_guests: Joi.number(),
  //     duration: Joi.number(),
  //     budget: Joi.number(),
  //     description: Joi.string(),
  //     country: Joi.string(),
  //     local_state: Joi.string(),
  //     city: Joi.string(),
  //     address: Joi.string(),
  //     dress_code: Joi.string(),
  //   },
  // }),
  eventInfos.create,
);
eventsRouter.get('/:event_id/event-info', eventInfos.show);

eventsRouter.put(
  '/:event_id/event-info',
  celebrate({
    [Segments.BODY]: {
      number_of_guests: Joi.number(),
      duration: Joi.number(),
      budget: Joi.number(),
      description: Joi.string(),
      country: Joi.string(),
      local_state: Joi.string(),
      city: Joi.string(),
      address: Joi.string(),
      dress_code: Joi.string(),
    },
  }),
  eventInfos.update,
);
eventsRouter.put(
  '/update-number-of-guests/:event_id/',
  celebrate({
    [Segments.BODY]: {
      number_of_guests: Joi.number(),
    },
  }),
  eventInfos.updateNumberOfGuests,
);

export default eventsRouter;
