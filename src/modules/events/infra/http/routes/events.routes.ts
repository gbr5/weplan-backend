import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventsController from '@modules/events/infra/http/controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SelectedSuppliersController from '@modules/events/infra/http/controllers/SelectedSuppliersController';
import UserCheckListsController from '@modules/events/infra/http/controllers/UserCheckListsController';
import GuestsController from '@modules/events/infra/http/controllers/GuestsController';
import HostGuestsController from '@modules/events/infra/http/controllers/HostGuestsController';
import EventPlannersController from '@modules/events/infra/http/controllers/EventPlannersController';
import EventOwnersController from '@modules/events/infra/http/controllers/EventOwnersController';
import EventMembersController from '@modules/events/infra/http/controllers/EventMembersController';
import EventInfosController from '@modules/events/infra/http/controllers/EventInfosController';

const eventsRouter = Router();
const eventsController = new EventsController();
const selectedSuppliersController = new SelectedSuppliersController();
const userCheckListsController = new UserCheckListsController();
const guestsController = new GuestsController();
const hostGuestsController = new HostGuestsController();
const eventPlannersController = new EventPlannersController();
const eventOwnersController = new EventOwnersController();
const eventMembersController = new EventMembersController();
const eventInfosController = new EventInfosController();

eventsRouter.use(ensureAuthenticated);

eventsRouter.get('/', eventsController.index);
eventsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      event_type: Joi.string().required(),
      date: Joi.date(),
    },
  }),
  eventsController.create,
);
eventsRouter.get('/:event_id', eventsController.show);

eventsRouter.put(
  '/:event_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      date: Joi.date(),
    },
  }),
  eventsController.update,
);

eventsRouter.delete('/:event_id', eventsController.delete);

// === Selected & Hired Suppliers === //

eventsRouter.post(
  '/:event_id/suppliers',
  celebrate({
    [Segments.BODY]: {
      supplier_id: Joi.string().uuid().required(),
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
    },
  }),
  selectedSuppliersController.create,
);

eventsRouter.put(
  '/:event_id/suppliers/:supplier_id',
  celebrate({
    [Segments.BODY]: {
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
    },
  }),
  selectedSuppliersController.update,
);

eventsRouter.delete(
  '/:event_id/suppliers/:supplier_id',
  selectedSuppliersController.delete,
);
eventsRouter.get(
  '/:event_id/selected_suppliers',
  selectedSuppliersController.index,
);

// === User Check List === //

eventsRouter.post(
  '/:event_id/check-list',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      priority_level: Joi.number(),
      checked: Joi.boolean(),
    },
  }),
  userCheckListsController.create,
);
eventsRouter.get('/:event_id/check-list', userCheckListsController.index);

eventsRouter.put(
  '/:event_id/check-list/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      priority_level: Joi.number(),
      checked: Joi.boolean(),
    },
  }),
  userCheckListsController.update,
);

eventsRouter.delete(
  '/:event_id/check-list/:id',
  userCheckListsController.delete,
);

// === Guests & Hosts Guests === //

eventsRouter.post(
  '/:event_id/guests',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      description: Joi.string().required(),
      confirmed: Joi.boolean().required(),
      weplanUser: Joi.boolean().required(),
      user_id: Joi.string(),
    },
  }),
  guestsController.create,
);

eventsRouter.put(
  '/:event_id/guests/:id',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      description: Joi.string().required(),
      confirmed: Joi.boolean().required(),
    },
  }),
  guestsController.update,
);

eventsRouter.delete('/:event_id/guests/:id', guestsController.delete);
eventsRouter.get('/:event_id/guests/', guestsController.index);
eventsRouter.get('/:event_id/guests/:host_id', hostGuestsController.index);

// === Event Planners === //

eventsRouter.post(
  '/:event_id/event-planner',
  celebrate({
    [Segments.BODY]: {
      planner_id: Joi.string().required(),
    },
  }),
  eventPlannersController.create,
);

eventsRouter.delete(
  '/:event_id/event-planner/:planner_id',
  eventPlannersController.delete,
);
eventsRouter.get('/:event_id/event-planner/', eventPlannersController.index);

// === Event Owners === //

eventsRouter.post(
  '/:event_id/event-owners',
  celebrate({
    [Segments.BODY]: {
      owner_id: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  eventOwnersController.create,
);

eventsRouter.delete(
  '/:event_id/event-owners/:owner_id',
  eventOwnersController.delete,
);
eventsRouter.get('/:event_id/event-owners/', eventOwnersController.index);

// === Event Members === //

eventsRouter.post(
  '/:event_id/event-members',
  celebrate({
    [Segments.BODY]: {
      member_id: Joi.string().required(),
    },
  }),
  eventMembersController.create,
);

eventsRouter.delete(
  '/:event_id/event-members/:member_id',
  eventMembersController.delete,
);
eventsRouter.get('/:event_id/event-members/', eventMembersController.index);

// === Event Info === //

eventsRouter.post(
  '/:event_id/event-info',
  celebrate({
    [Segments.BODY]: {
      number_of_guests: Joi.number().required(),
      duration: Joi.number().required(),
      budget: Joi.number().required(),
      description: Joi.string().required(),
      country: Joi.string().required(),
      local_state: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  eventInfosController.create,
);
eventsRouter.get('/:event_id/event-info', eventInfosController.show);

eventsRouter.put(
  '/:event_id/event-info',
  celebrate({
    [Segments.BODY]: {
      number_of_guests: Joi.number().required(),
      duration: Joi.number().required(),
      budget: Joi.number().required(),
      description: Joi.string().required(),
      country: Joi.string().required(),
      local_state: Joi.string().required(),
      city: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  eventInfosController.update,
);

export default eventsRouter;
