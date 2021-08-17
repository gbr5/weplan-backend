import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import FriendGroupsController from '@modules/users/infra/http/controllers/FriendGroupsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const friendGroupsController = new FriendGroupsController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isCompany: Joi.boolean().required(),
    },
  }),
  usersController.create,
);
usersRouter.get('/:user_id', usersController.show);
usersRouter.get('/', ensureAuthenticated, usersController.index);
usersRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  usersController.update,
);
usersRouter.patch(
  '/avatar/:user_id',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

// === Friend Groups === //

usersRouter.post(
  '/friend-groups',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  friendGroupsController.create,
);
usersRouter.get(
  '/friend-groups/list',
  ensureAuthenticated,
  friendGroupsController.list,
);
usersRouter.delete(
  '/friend-groups/:id',
  ensureAuthenticated,
  friendGroupsController.delete,
);
usersRouter.put(
  '/friend-groups/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  friendGroupsController.update,
);

export default usersRouter;
