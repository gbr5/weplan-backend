import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardNotesController from '@modules/suppliers/infra/http/controllers/CardNotesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardsRouter = Router();
const cardNotesController = new CardNotesController();

cardsRouter.use(ensureAuthenticated);

// === Card Notes === //

cardsRouter.post(
  '/notes',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
      card_unique_name: Joi.string().required(),
      note: Joi.string().required(),
    },
  }),
  cardNotesController.create,
);

cardsRouter.get('/notes/:card_unique_name', cardNotesController.index);

cardsRouter.put(
  '/notes/:id',
  celebrate({
    [Segments.BODY]: {
      note: Joi.string().required(),
    },
  }),
  cardNotesController.update,
);

cardsRouter.delete('/notes/:id', cardNotesController.delete);

export default cardsRouter;