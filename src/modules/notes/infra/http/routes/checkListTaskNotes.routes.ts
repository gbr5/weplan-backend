import { Router } from 'express';

import CheckListTaskNoteController from '@modules/notes/infra/http/controllers/CheckListTaskNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const checkListTaskNotesRouter = Router();
const checkListTaskController = new CheckListTaskNoteController();

checkListTaskNotesRouter.post(
  '/',
  ensureAuthenticated,
  checkListTaskController.create,
);

checkListTaskNotesRouter.get(
  '/:id',
  ensureAuthenticated,
  checkListTaskController.list,
);
checkListTaskNotesRouter.delete(
  '/:id',
  ensureAuthenticated,
  checkListTaskController.delete,
);

export default checkListTaskNotesRouter;
