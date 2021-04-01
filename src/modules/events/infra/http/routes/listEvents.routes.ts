import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EventOwnersController from '../controllers/EventOwnersController';
import EventMembersController from '../controllers/EventMembersController';
import ListEventsAsGuestController from '../controllers/ListEventsAsGuestController';

const listEventsRouter = Router();
const listEventsAsOwnersController = new EventOwnersController();
const listEventsAsMembersController = new EventMembersController();
const listEventsAsGuestController = new ListEventsAsGuestController();

listEventsRouter.use(ensureAuthenticated);

listEventsRouter.get(
  '/user-as-owner/',
  listEventsAsOwnersController.listAsOwner,
);
listEventsRouter.get(
  '/user-as-member/',
  listEventsAsMembersController.listAsMember,
);
listEventsRouter.get('/user-as-guest/', listEventsAsGuestController.index);

export default listEventsRouter;
