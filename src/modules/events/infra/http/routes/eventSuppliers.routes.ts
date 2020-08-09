import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventSuppliersController from '@modules/events/infra/http/controllers/EventSuppliersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventSuppliersRouter = Router();
const eventSuppliersController = new EventSuppliersController();

eventSuppliersRouter.use(ensureAuthenticated);

eventSuppliersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      supplier_id: Joi.string().uuid().required(),
      event_name: Joi.string().required(),
    },
  }),
  eventSuppliersController.create,
);
eventSuppliersRouter.get('/:event_name', eventSuppliersController.index);
eventSuppliersRouter.delete(
  '/:event_name/:supplier_id',
  eventSuppliersController.delete,
);

export default eventSuppliersRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
