import { Router } from 'express';

import EventFilesController from '@modules/events/infra/http/controllers/EventFilesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventFilesRouter = Router();
const eventFilesController = new EventFilesController();

eventFilesRouter.use(ensureAuthenticated);

eventFilesRouter.post('/', eventFilesController.create);
eventFilesRouter.get('/:event_id', eventFilesController.list);
eventFilesRouter.delete('/:id', eventFilesController.delete);

export default eventFilesRouter;
