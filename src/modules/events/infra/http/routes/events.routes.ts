import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventsController from '@modules/events/infra/http/controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventsRouter = Router();
const eventsController = new EventsController();

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
eventsRouter.get('/:trimmed_name', eventsController.show);

eventsRouter.put(
  '/:trimmed_name',
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

export default eventsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
