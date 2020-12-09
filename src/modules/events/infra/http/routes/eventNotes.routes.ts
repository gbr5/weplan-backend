import { Router } from 'express';

import EventNotesController from '@modules/events/infra/http/controllers/EventNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventNotesRouter = Router();
const eventNotesController = new EventNotesController();

eventNotesRouter.use(ensureAuthenticated);

eventNotesRouter.post('/', eventNotesController.create);
eventNotesRouter.get('/:event_id', eventNotesController.list);
eventNotesRouter.get(
  '/access/:event_id/:access',
  eventNotesController.listByAccess,
);
eventNotesRouter.put('/:id', eventNotesController.update);
eventNotesRouter.delete('/:id', eventNotesController.delete);

export default eventNotesRouter;
