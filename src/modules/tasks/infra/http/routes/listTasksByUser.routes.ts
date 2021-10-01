import { Router } from 'express';

import ListTasksByUserController from '@modules/tasks/infra/http/controllers/ListTasksByUserController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listTasksByUserRouter = Router();
const listTasksByUserController = new ListTasksByUserController();

listTasksByUserRouter.use(ensureAuthenticated);

listTasksByUserRouter.get('/', listTasksByUserController.index);

export default listTasksByUserRouter;
