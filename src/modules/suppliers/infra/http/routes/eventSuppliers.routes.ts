import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventSuppliersController from '@modules/suppliers/infra/http/controllers/EventSuppliersController';

const eventSuppliersRouter = Router();
const eventSuppliers = new EventSuppliersController();

eventSuppliersRouter.use(ensureAuthenticated);

// === Selected & Hired Suppliers === //

eventSuppliersRouter.post(
  '/:event_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
      weplanUser: Joi.boolean().required(),
    },
  }),
  eventSuppliers.create,
);
eventSuppliersRouter.get('/:event_id', eventSuppliers.index);
eventSuppliersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      supplier_sub_category: Joi.string().required(),
      isHired: Joi.boolean().required(),
      weplanUser: Joi.boolean().required(),
    },
  }),
  eventSuppliers.update,
);

eventSuppliersRouter.delete('/:id', eventSuppliers.delete);

export default eventSuppliersRouter;
