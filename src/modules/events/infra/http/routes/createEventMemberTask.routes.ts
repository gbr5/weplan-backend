import { Router } from 'express';

import CreateEventMemberTaskController from '@modules/events/infra/http/controllers/CreateEventMemberTaskController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createEventMemberTaskRouter = Router();
const createEventMemberTaskController = new CreateEventMemberTaskController();

createEventMemberTaskRouter.use(ensureAuthenticated);

createEventMemberTaskRouter.post('/', createEventMemberTaskController.create);

export default createEventMemberTaskRouter;
