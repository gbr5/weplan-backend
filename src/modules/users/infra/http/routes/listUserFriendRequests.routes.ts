import { Router } from 'express';

import ListUserFriendRequestsController from '@modules/users/infra/http/controllers/ListUserFriendRequestsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listUserFriendRequestsRouter = Router();
const listUserFriendRequestsController = new ListUserFriendRequestsController();

listUserFriendRequestsRouter.get(
  '/',
  ensureAuthenticated,
  listUserFriendRequestsController.list,
);

export default listUserFriendRequestsRouter;
