import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardCheckListController from '@modules/checklists/infra/http/controllers/CardCheckListsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardCheckListRouter = Router();
const cardCheckListController = new CardCheckListController();

cardCheckListRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      check_list_id: Joi.string().required(),
      card_unique_name: Joi.string().required(),
    },
  }),
  cardCheckListController.create,
);
cardCheckListRouter.get(
  '/:card_unique_name',
  ensureAuthenticated,
  cardCheckListController.index,
);
cardCheckListRouter.delete(
  '/:id',
  ensureAuthenticated,
  cardCheckListController.delete,
);

export default cardCheckListRouter;
