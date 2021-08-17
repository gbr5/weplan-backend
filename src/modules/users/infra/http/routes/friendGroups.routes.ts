import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FriendGroupsController from '@modules/users/infra/http/controllers/FriendGroupsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const friendGroupsRouter = Router();
const friendGroupsController = new FriendGroupsController();

friendGroupsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  friendGroupsController.create,
);
friendGroupsRouter.get('/', ensureAuthenticated, friendGroupsController.list);
friendGroupsRouter.delete(
  '/:id',
  ensureAuthenticated,
  friendGroupsController.delete,
);
friendGroupsRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  friendGroupsController.update,
);

export default friendGroupsRouter;
