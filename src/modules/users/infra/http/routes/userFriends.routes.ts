import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserFriendsController from '@modules/users/infra/http/controllers/UserFriendsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userFriendsRouter = Router();
const userFriendsController = new UserFriendsController();

userFriendsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      friend_id: Joi.string().required(),
    },
  }),
  userFriendsController.create,
);
userFriendsRouter.get('/', ensureAuthenticated, userFriendsController.list);
userFriendsRouter.put(
  '/:id',
  ensureAuthenticated,
  userFriendsController.update,
);
userFriendsRouter.delete(
  '/:id',
  ensureAuthenticated,
  userFriendsController.delete,
);

export default userFriendsRouter;
