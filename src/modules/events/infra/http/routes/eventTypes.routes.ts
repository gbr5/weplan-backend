import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventTypesController from '@modules/events/infra/http/controllers/EventTypesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventTypesRouter = Router();
const eventTypesController = new EventTypesController();

eventTypesRouter.use(ensureAuthenticated);

eventTypesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  eventTypesController.create,
);
eventTypesRouter.get('/', eventTypesController.index);
eventTypesRouter.put(
  '/:name',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  eventTypesController.update,
);

export default eventTypesRouter;
