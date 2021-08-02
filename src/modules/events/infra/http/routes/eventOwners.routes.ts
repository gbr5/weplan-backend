import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventOwnersController from '@modules/events/infra/http/controllers/EventOwnersController';

const eventOwnersRouter = Router();

const eventOwners = new EventOwnersController();

eventOwnersRouter.use(ensureAuthenticated);

eventOwnersRouter.post(
  '/:event_id',
  celebrate({
    [Segments.BODY]: {
      owner_id: Joi.string().required(),
      description: Joi.string(),
      number_of_guests: Joi.number(),
    },
  }),
  eventOwners.create,
);

eventOwnersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string(),
      number_of_guests: Joi.number(),
    },
  }),
  eventOwners.update,
);

eventOwnersRouter.put(
  '/master-number-of-guests/:event_id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string(),
      number_of_guests: Joi.number(),
    },
  }),
  eventOwners.updateEventMaster,
);

eventOwnersRouter.delete('/:id', eventOwners.delete);
eventOwnersRouter.get('/:event_id/', eventOwners.index);
eventOwnersRouter.get('/event-owner/:event_id/:owner_id/', eventOwners.show);

export default eventOwnersRouter;
