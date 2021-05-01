import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardNotesController from '@modules/suppliers/infra/http/controllers/CardNotesController';
import StageCardsController from '@modules/suppliers/infra/http/controllers/StageCardsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardsRouter = Router();
const stageCardsController = new StageCardsController();
const cardNotesController = new CardNotesController();

cardsRouter.use(ensureAuthenticated);

cardsRouter.get('/show/:id', stageCardsController.show);

cardsRouter.post(
  '/:stage_id',
  celebrate({
    [Segments.BODY]: {
      weplanEvent: Joi.boolean(),
      name: Joi.string().required(),
      card_owner: Joi.string().required(),
    },
  }),
  stageCardsController.create,
);

cardsRouter.get('/:stage_id', stageCardsController.index);

cardsRouter.put('/:id', stageCardsController.update);

cardsRouter.delete('/:id', stageCardsController.delete);

// === Card Notes === //

cardsRouter.post(
  '/create/notes',
  // celebrate({
  //   [Segments.BODY]: {
  //     user_id: Joi.string().requirupdateCarded(),
  //     card_unique_name: Joi.string().required(),
  //     note: Joi.string().required(),
  //   },
  // }),
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
