import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventOwnerPaymentController from '@modules/transactions/infra/http/controllers/EventOwnerPaymentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventOwnerPaymentRouter = Router();
const eventOwnerPaymentController = new EventOwnerPaymentController();

eventOwnerPaymentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      event_owner_id: Joi.string().required(),
      event_id: Joi.string().required(),
      value: Joi.number().required(),
      isPaid: Joi.boolean().required(),
      description: Joi.string().required(),
      due_date: Joi.date().required(),
    },
  }),
  eventOwnerPaymentController.create,
);
eventOwnerPaymentRouter.get(
  '/owner/:event_owner_id',
  eventOwnerPaymentController.listByOwner,
);
eventOwnerPaymentRouter.get(
  '/event/:event_id',
  eventOwnerPaymentController.listByEvent,
);
eventOwnerPaymentRouter.delete('/:id', eventOwnerPaymentController.delete);

eventOwnerPaymentRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      value: Joi.number().required(),
      isPaid: Joi.boolean().required(),
      description: Joi.string().required(),
      due_date: Joi.date().required(),
    },
  }),
  eventOwnerPaymentController.update,
);

export default eventOwnerPaymentRouter;
