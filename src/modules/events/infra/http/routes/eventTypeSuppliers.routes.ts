import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventTypeSuppliersController from '@modules/events/infra/http/controllers/EventTypeSuppliersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventTypeSuppliersRouter = Router();
const eventTypeSuppliersController = new EventTypeSuppliersController();

eventTypeSuppliersRouter.use(ensureAuthenticated);

eventTypeSuppliersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      event_type: Joi.string().required(),
    },
  }),
  eventTypeSuppliersController.create,
);

eventTypeSuppliersRouter.get(
  '/:event_type',
  eventTypeSuppliersController.index,
);

eventTypeSuppliersRouter.get(
  '/:event_type/:user_id',
  eventTypeSuppliersController.show,
);

eventTypeSuppliersRouter.delete(
  '/:event_type/:user_id',
  eventTypeSuppliersController.delete,
);

export default eventTypeSuppliersRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
