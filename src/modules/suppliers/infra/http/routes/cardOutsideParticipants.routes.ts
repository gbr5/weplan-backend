import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardOutsideParticipantsController from '@modules/suppliers/infra/http/controllers/CardOutsideParticipantsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardOutsideParticipantsRouter = Router();
const cardOutsideParticipantsController = new CardOutsideParticipantsController();

cardOutsideParticipantsRouter.use(ensureAuthenticated);

// === Card Outside Participants === //

cardOutsideParticipantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_contact_id: Joi.string().required(),
      card_unique_name: Joi.string().required(),
      contact_card_unique_name: Joi.string(),
      status: Joi.string(),
      isActive: Joi.boolean().required(),
    },
  }),
  cardOutsideParticipantsController.create,
);

cardOutsideParticipantsRouter.get(
  '/:card_unique_name',
  cardOutsideParticipantsController.index,
);

cardOutsideParticipantsRouter.get(
  '/:contact_card_unique_name',
  cardOutsideParticipantsController.listContactCards,
);

cardOutsideParticipantsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  cardOutsideParticipantsController.update,
);

cardOutsideParticipantsRouter.delete(
  '/:id',
  cardOutsideParticipantsController.delete,
);

export default cardOutsideParticipantsRouter;
