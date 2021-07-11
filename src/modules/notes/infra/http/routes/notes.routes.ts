import { Router } from 'express';

import NotesController from '@modules/notes/infra/http/controllers/NotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const notesRouter = Router();
const notesController = new NotesController();

notesRouter.put('/', ensureAuthenticated, notesController.update);

export default notesRouter;
