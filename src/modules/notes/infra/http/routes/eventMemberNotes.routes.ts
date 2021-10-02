import { Router } from 'express';

import EventMemberNotesController from '@modules/notes/infra/http/controllers/EventMemberNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMemberNotesRouter = Router();
const eventMemberController = new EventMemberNotesController();

eventMemberNotesRouter.post(
  '/',
  ensureAuthenticated,
  eventMemberController.create,
);

eventMemberNotesRouter.get(
  '/:member_id',
  ensureAuthenticated,
  eventMemberController.list,
);
eventMemberNotesRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventMemberController.delete,
);

export default eventMemberNotesRouter;
