import { Router } from 'express';

import EventOwnerNotesController from '@modules/notes/infra/http/controllers/EventOwnerNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventOwnerNotesRouter = Router();
const eventOwnerController = new EventOwnerNotesController();

eventOwnerNotesRouter.post(
  '/',
  ensureAuthenticated,
  eventOwnerController.create,
);

eventOwnerNotesRouter.get(
  '/:owner_id',
  ensureAuthenticated,
  eventOwnerController.list,
);
eventOwnerNotesRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventOwnerController.delete,
);

export default eventOwnerNotesRouter;
