import { Router } from 'express';

import EventTaskFollowersController from '@modules/events/infra/http/controllers/EventTaskFollowersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventTaskFollowersRouter = Router();
const eventTaskFollowersController = new EventTaskFollowersController();

eventTaskFollowersRouter.use(ensureAuthenticated);

eventTaskFollowersRouter.post('/', eventTaskFollowersController.create);
eventTaskFollowersRouter.get('/:task_id', eventTaskFollowersController.list);
eventTaskFollowersRouter.delete('/:id', eventTaskFollowersController.delete);

export default eventTaskFollowersRouter;
