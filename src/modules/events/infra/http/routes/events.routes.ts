import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventsController from '@modules/events/infra/http/controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EventSuppliersController from '@modules/events/infra/http/controllers/EventSuppliersController';
import HiredSuppliersController from '@modules/events/infra/http/controllers/HiredSuppliersController';
import EventWeplanSuppliersController from '@modules/events/infra/http/controllers/EventWeplanSuppliersController';
import UserCheckListsController from '@modules/events/infra/http/controllers/UserCheckListsController';
import GuestsController from '@modules/events/infra/http/controllers/GuestsController';
import HostGuestsController from '@modules/events/infra/http/controllers/HostGuestsController';
import EventPlannersController from '@modules/events/infra/http/controllers/EventPlannersController';
import EventOwnersController from '@modules/events/infra/http/controllers/EventOwnersController';
import EventMembersController from '@modules/events/infra/http/controllers/EventMembersController';
import EventInfosController from '@modules/events/infra/http/controllers/EventInfosController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const eventsRouter = Router();
const events = new EventsController();
const eventSuppliers = new EventSuppliersController();
const hiredSuppliers = new HiredSuppliersController();
const eventWeplanSuppliers = new EventWeplanSuppliersController();
const userCheckLists = new UserCheckListsController();
const guests = new GuestsController();
const hostGuests = new HostGuestsController();
const eventPlanners = new EventPlannersController();
const eventOwners = new EventOwnersController();
const eventMembers = new EventMembersController();
const eventInfos = new EventInfosController();
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
    },
  }),
  events.create,
);
eventsRouter.get('/:event_id', events.show);

eventsRouter.put(
  '/:event_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      date: Joi.date(),
    },
  }),
  events.update,
);

eventsRouter.delete('/:event_id', events.delete);

// === Hired Suppliers === //

eventsRouter.get('/hired-suppliers/:event_id', hiredSuppliers.index);

// === Selected & Hired Suppliers === //

eventsRouter.post(
  '/event-suppliers/:event_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
      weplanUser: Joi.boolean().required(),
    },
  }),
  eventSuppliers.create,
);

eventsRouter.put(
  '/event-suppliers/edit/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
    },
  }),
  eventSuppliers.update,
);

eventsRouter.delete('/:event_id/event-suppliers/:id', eventSuppliers.delete);
eventsRouter.get('/event-suppliers/:event_id', eventSuppliers.index);

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
      status: Joi.number().required(),
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

eventsRouter.delete('/check-list/:id', userCheckLists.delete);

// === Guests & Hosts Guests === //

eventsRouter.post(
  '/:event_id/guests',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      description: Joi.string(),
      confirmed: Joi.boolean().required(),
      weplanUser: Joi.boolean().required(),
      user_id: Joi.string(),
    },
  }),
  guests.create,
);

eventsRouter.post(
  '/:event_id/guests/import',
  upload.single('file'),
  guests.import,
);

eventsRouter.put(
  '/:event_id/guests/:id',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      description: Joi.string(),
      confirmed: Joi.boolean().required(),
    },
  }),
  guests.update,
);

eventsRouter.put(
  '/weplan-user-guest/:id',
  celebrate({
    [Segments.BODY]: {
      confirmed: Joi.boolean().required(),
    },
  }),
  guests.updateWeplanGuest,
);

eventsRouter.delete('/guests/:id', guests.delete);
eventsRouter.get('/:event_id/guests/', guests.index);
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

// === Event Owners === //

eventsRouter.post(
  '/:event_id/event-owners',
  celebrate({
    [Segments.BODY]: {
      owner_id: Joi.string().required(),
      description: Joi.string(),
      number_of_guests: Joi.number(),
    },
  }),
  eventOwners.create,
);

eventsRouter.put(
  '/:event_id/event-owners/:owner_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string(),
      number_of_guests: Joi.number(),
    },
  }),
  eventOwners.update,
);

eventsRouter.delete('/:event_id/event-owners/:owner_id', eventOwners.delete);
eventsRouter.get('/:event_id/event-owners/', eventOwners.index);

// === Event Members === //

eventsRouter.post(
  '/:event_id/event-members',
  celebrate({
    [Segments.BODY]: {
      member_id: Joi.string().required(),
      number_of_guests: Joi.number(),
    },
  }),
  eventMembers.create,
);

eventsRouter.put(
  '/:event_id/event-members/:member_id',
  celebrate({
    [Segments.BODY]: {
      number_of_guests: Joi.number(),
    },
  }),
  eventMembers.update,
);

eventsRouter.delete('/:event_id/event-members/:member_id', eventMembers.delete);
eventsRouter.get('/:event_id/event-members/', eventMembers.index);

// === Event Info === //

eventsRouter.post(
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
    },
  }),
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
    },
  }),
  eventInfos.update,
);

export default eventsRouter;
