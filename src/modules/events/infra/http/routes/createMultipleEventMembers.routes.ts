import { Router } from 'express';

import CreateMultipleEventMembersController from '@modules/events/infra/http/controllers/CreateMultipleEventMembersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createMultipleEventMembersRouter = Router();
const createMultipleEventMembers = new CreateMultipleEventMembersController();

createMultipleEventMembersRouter.use(ensureAuthenticated);

createMultipleEventMembersRouter.post('/', createMultipleEventMembers.create);

export default createMultipleEventMembersRouter;
