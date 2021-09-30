import { Router } from 'express';

import TaskNotesController from '@modules/tasks/infra/http/controllers/TaskNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const taskNotesRouter = Router();
const taskNotesController = new TaskNotesController();

taskNotesRouter.use(ensureAuthenticated);

taskNotesRouter.post('/', taskNotesController.create);
taskNotesRouter.get('/:task_id', taskNotesController.list);
taskNotesRouter.delete('/:id', taskNotesController.delete);

export default taskNotesRouter;
