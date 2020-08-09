import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventTypesController from '@modules/events/infra/http/controllers/EventTypesController';
import EventTypeSuppliersController from '@modules/events/infra/http/controllers/EventTypeSuppliersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventTypesRouter = Router();
const eventTypesController = new EventTypesController();
const eventTypeSuppliersController = new EventTypeSuppliersController();

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

eventTypesRouter.post('/:event_type', eventTypeSuppliersController.create);

eventTypesRouter.get('/:event_type', eventTypeSuppliersController.index);

eventTypesRouter.get(
  '/:event_type/:user_id',
  eventTypeSuppliersController.show,
);

eventTypesRouter.delete('/:event_type/', eventTypeSuppliersController.delete);

export default eventTypesRouter;
