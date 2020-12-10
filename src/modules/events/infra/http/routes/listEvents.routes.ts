import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import EventOwnersController from '../controllers/EventOwnersController';
import EventMembersController from '../controllers/EventMembersController';

const listEventsRouter = Router();
const listEventsAsOwnersController = new EventOwnersController();
const listEventsAsMembersController = new EventMembersController();

listEventsRouter.use(ensureAuthenticated);

listEventsRouter.get(
  '/user-as-owner/',
  listEventsAsOwnersController.listAsOwner,
);
listEventsRouter.get(
  '/user-as-member/',
  listEventsAsMembersController.listAsMember,
);

export default listEventsRouter;
