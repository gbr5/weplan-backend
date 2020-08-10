import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventsController from '@modules/events/infra/http/controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SelectedSuppliersController from '@modules/events/infra/http/controllers/SelectedSuppliersController';
import HiredSuppliersController from '@modules/events/infra/http/controllers/HiredSuppliersController';
import UserCheckListsController from '@modules/events/infra/http/controllers/UserCheckListsController';

const eventsRouter = Router();
const eventsController = new EventsController();
const selectedSuppliersController = new SelectedSuppliersController();
const hiredSuppliersController = new HiredSuppliersController();
const userCheckListsController = new UserCheckListsController();

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
  '/check-list/:event_name',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      priority_level: Joi.number(),
      checked: Joi.boolean(),
    },
  }),
  userCheckListsController.create,
);
eventsRouter.get('/check-list/:event_name', userCheckListsController.index);

eventsRouter.put(
  '/check-list/:event_name/:id',
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
  '/check-list/:event_name/:id',
  userCheckListsController.delete,
);

export default eventsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
