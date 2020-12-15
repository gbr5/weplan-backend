import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EventMemberPaymentController from '@modules/transactions/infra/http/controllers/EventMemberPaymentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMemberPaymentRouter = Router();
const eventMemberPaymentController = new EventMemberPaymentController();

eventMemberPaymentRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      event_member_id: Joi.string().required(),
      event_id: Joi.string().required(),
      value: Joi.number().required(),
      isPaid: Joi.boolean().required(),
      description: Joi.string().required(),
      due_date: Joi.date().required(),
    },
  }),
  eventMemberPaymentController.create,
);
eventMemberPaymentRouter.get(
  '/member/:event_member_id',
  eventMemberPaymentController.listByMember,
);
eventMemberPaymentRouter.get(
  '/event/:event_id',
  eventMemberPaymentController.listByEvent,
);
eventMemberPaymentRouter.delete('/:id', eventMemberPaymentController.delete);

eventMemberPaymentRouter.put(
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
  eventMemberPaymentController.update,
);

export default eventMemberPaymentRouter;
