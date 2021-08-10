import { Router } from 'express';

import CreateEventNoteAndTransactionNoteController from '@modules/notes/infra/http/controllers/CreateEventNoteAndTransactionNoteController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createEventNoteAndTransactionNoteRouter = Router();
const createEventNoteAndTransactionNoteController = new CreateEventNoteAndTransactionNoteController();

createEventNoteAndTransactionNoteRouter.post(
  '/',
  ensureAuthenticated,
  createEventNoteAndTransactionNoteController.create,
);

export default createEventNoteAndTransactionNoteRouter;
