import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventInfosController from '@modules/events/infra/http/controllers/EventInfosController';

const eventInfoRouter = Router();
const eventInfos = new EventInfosController();

eventInfoRouter.use(ensureAuthenticated);

// === Event Info === //

eventInfoRouter.post(
  '/:event_id',
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
eventInfoRouter.get('/:event_id/event-info', eventInfos.show);

eventInfoRouter.put(
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
  eventInfos.update,
);
eventInfoRouter.put(
  '/update-number-of-guests/:event_id/',
  celebrate({
    [Segments.BODY]: {
      number_of_guests: Joi.number(),
    },
  }),
  eventInfos.updateNumberOfGuests,
);

export default eventInfoRouter;
