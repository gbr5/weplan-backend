import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventMembersController from '@modules/events/infra/http/controllers/EventMembersController';

const eventMembersRouter = Router();

const eventMembers = new EventMembersController();

eventMembersRouter.use(ensureAuthenticated);

eventMembersRouter.post(
  '/:event_id/',
  celebrate({
    [Segments.BODY]: {
      member_id: Joi.string().required(),
      number_of_guests: Joi.number(),
    },
  }),
  eventMembers.create,
);

eventMembersRouter.put(
  '/:event_id/:member_id',
  celebrate({
    [Segments.BODY]: {
      number_of_guests: Joi.number(),
    },
  }),
  eventMembers.update,
);

eventMembersRouter.delete('/:id', eventMembers.delete);
eventMembersRouter.get('/:event_id/', eventMembers.index);

export default eventMembersRouter;
