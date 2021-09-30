import { Router } from 'express';

import TasksController from '@modules/tasks/infra/http/controllers/TasksController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.post('/', ensureAuthenticated, tasksController.create);
tasksRouter.put('/', ensureAuthenticated, tasksController.update);
tasksRouter.get('/', ensureAuthenticated, tasksController.index);
tasksRouter.delete('/:id', ensureAuthenticated, tasksController.delete);

export default tasksRouter;
