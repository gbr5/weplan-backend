import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardParcticipantsController from '@modules/suppliers/infra/http/controllers/CardParticipantsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardParticipantsRouter = Router();
const cardParticipantsController = new CardParcticipantsController();

cardParticipantsRouter.use(ensureAuthenticated);

// === Card Participants === //

cardParticipantsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      card_unique_name: Joi.string().required(),
    },
  }),
  cardParticipantsController.create,
);

cardParticipantsRouter.get(
  '/:card_unique_name',
  cardParticipantsController.index,
);

cardParticipantsRouter.delete('/:id', cardParticipantsController.delete);

export default cardParticipantsRouter;
