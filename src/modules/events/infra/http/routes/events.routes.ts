import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventsController from '@modules/events/infra/http/controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EventSuppliersController from '@modules/events/infra/http/controllers/EventSuppliersController';

const eventsRouter = Router();
const eventsController = new EventsController();
const eventSuppliersController = new EventSuppliersController();

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

eventsRouter.post(
  '/:event_name',
  celebrate({
    [Segments.BODY]: {
      supplier_id: Joi.string().uuid().required(),
    },
  }),
  eventSuppliersController.create,
);

eventsRouter.get('/:event_name/suppliers', eventSuppliersController.index);

eventsRouter.delete(
  '/:event_name/:supplier_id',
  eventSuppliersController.delete,
);

export default eventsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
