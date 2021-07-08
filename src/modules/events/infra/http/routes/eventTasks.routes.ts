import { Router } from 'express';

import EventTasksController from '@modules/events/infra/http/controllers/EventTasksController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventTasksRouter = Router();
const eventTasksController = new EventTasksController();

eventTasksRouter.use(ensureAuthenticated);

eventTasksRouter.post('/', eventTasksController.create);
eventTasksRouter.get('/:event_id', eventTasksController.list);
eventTasksRouter.put('/:id', eventTasksController.update);
eventTasksRouter.delete('/:id', eventTasksController.delete);

export default eventTasksRouter;
