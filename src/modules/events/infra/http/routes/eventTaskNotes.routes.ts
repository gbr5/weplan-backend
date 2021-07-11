import { Router } from 'express';

import EventTaskNotesController from '@modules/events/infra/http/controllers/EventTaskNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventTaskNotesRouter = Router();
const eventTaskNotesController = new EventTaskNotesController();

eventTaskNotesRouter.use(ensureAuthenticated);

eventTaskNotesRouter.post('/', eventTaskNotesController.create);
eventTaskNotesRouter.get('/:task_id', eventTaskNotesController.list);
eventTaskNotesRouter.delete('/:id', eventTaskNotesController.delete);

export default eventTaskNotesRouter;
