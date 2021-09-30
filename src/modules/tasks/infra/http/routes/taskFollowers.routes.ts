import { Router } from 'express';

import TaskFollowersController from '@modules/tasks/infra/http/controllers/TaskFollowersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const taskFollowersRouter = Router();
const taskFollowersController = new TaskFollowersController();

taskFollowersRouter.use(ensureAuthenticated);

taskFollowersRouter.post('/', taskFollowersController.create);
taskFollowersRouter.get('/:task_id', taskFollowersController.list);
taskFollowersRouter.delete('/:id', taskFollowersController.delete);

export default taskFollowersRouter;
