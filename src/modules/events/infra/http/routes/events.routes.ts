import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventsController from '@modules/events/infra/http/controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SelectedSuppliersController from '@modules/events/infra/http/controllers/SelectedSuppliersController';
import HiredSuppliersController from '@modules/events/infra/http/controllers/HiredSuppliersController';
import UserCheckListsController from '@modules/events/infra/http/controllers/UserCheckListsController';
import GuestsController from '@modules/events/infra/http/controllers/GuestsController';
import HostGuestsController from '@modules/events/infra/http/controllers/HostGuestsController';
import EventPlannersController from '@modules/events/infra/http/controllers/EventPlannersController';
import EventOwnersController from '@modules/events/infra/http/controllers/EventOwnersController';

const eventsRouter = Router();
const eventsController = new EventsController();
const selectedSuppliersController = new SelectedSuppliersController();
const hiredSuppliersController = new HiredSuppliersController();
const userCheckListsController = new UserCheckListsController();
const guestsController = new GuestsController();
const hostGuestsController = new HostGuestsController();
const eventPlannersController = new EventPlannersController();
const eventOwnersController = new EventOwnersController();

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
eventsRouter.get('/:event_name', eventsController.show);

eventsRouter.put(
  '/:event_name',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      name: Joi.string().required(),
      event_type: Joi.string().required(),
      date: Joi.date(),
    },
  }),
  eventsController.update,
);

// === Selected & Hired Suppliers === //

eventsRouter.post(
  '/suppliers',
  celebrate({
    [Segments.BODY]: {
      supplier_id: Joi.string().uuid().required(),
      event_name: Joi.string().required(),
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
    },
  }),
  selectedSuppliersController.create,
);

eventsRouter.put(
  '/:event_name/:supplier_id',
  celebrate({
    [Segments.BODY]: {
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
    },
  }),
  selectedSuppliersController.update,
);

eventsRouter.delete(
  '/:event_name/:supplier_id',
  selectedSuppliersController.delete,
);
eventsRouter.get(
  '/:event_name/selected_suppliers',
  selectedSuppliersController.index,
);
eventsRouter.get(
  '/:event_name/hired_suppliers',
  hiredSuppliersController.index,
);

// === User Check List === //

eventsRouter.post(
  '/:event_name/check-list',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      priority_level: Joi.number(),
      checked: Joi.boolean(),
    },
  }),
  userCheckListsController.create,
);
eventsRouter.get('/:event_name/check-list', userCheckListsController.index);

eventsRouter.put(
  '/:event_name/check-list/:id',
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
  '/:event_name/check-list/:id',
  userCheckListsController.delete,
);

// === Guests & Hosts Guests === //

eventsRouter.post(
  '/:event_name/guests',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      description: Joi.string().required(),
      host_id: Joi.string().required(),
      confirmed: Joi.boolean().required(),
    },
  }),
  guestsController.create,
);

eventsRouter.put(
  '/:event_name/guests/:first_name-:last_name',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().uuid().required(),
      last_name: Joi.string().required(),
      description: Joi.string().required(),
      host_id: Joi.string().required(),
      confirmed: Joi.boolean().required(),
    },
  }),
  guestsController.update,
);

eventsRouter.delete(
  '/:event_name/guests/:first_name-:last_name',
  guestsController.delete,
);
eventsRouter.get('/:event_name/guests/', guestsController.index);
eventsRouter.get('/:event_name/guests/:host_id', hostGuestsController.index);

// === Event Planners === //

eventsRouter.post(
  '/:event_name/event-planner',
  celebrate({
    [Segments.BODY]: {
      planner_id: Joi.string().required(),
    },
  }),
  eventPlannersController.create,
);

eventsRouter.delete(
  '/:event_name/event-planner/:planner_id',
  eventPlannersController.delete,
);
eventsRouter.get('/:event_name/event-planner/', eventPlannersController.index);

// === Event Owners === //

eventsRouter.post(
  '/:event_name/event-owners',
  celebrate({
    [Segments.BODY]: {
      owner_id: Joi.string().required(),
    },
  }),
  eventOwnersController.create,
);

eventsRouter.delete(
  '/:event_name/event-owners/:owner_id',
  eventOwnersController.delete,
);
eventsRouter.get('/:event_name/event-owners/', eventOwnersController.index);

export default eventsRouter;
