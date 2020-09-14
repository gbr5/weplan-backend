import { Router } from 'express';

import FriendsEventsController from '@modules/events/infra/http/controllers/FriendsEventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const friendsEventsRouter = Router();
const friendsEventsController = new FriendsEventsController();

friendsEventsRouter.use(ensureAuthenticated);

friendsEventsRouter.get('/', friendsEventsController.index);

export default friendsEventsRouter;
