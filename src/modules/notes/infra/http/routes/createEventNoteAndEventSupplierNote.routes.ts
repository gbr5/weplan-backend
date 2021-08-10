import { Router } from 'express';

import CreateEventNoteAndEventSupplierNoteController from '@modules/notes/infra/http/controllers/CreateEventNoteAndEventSupplierNoteController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createEventNoteAndEventSupplierNoteRouter = Router();
const createEventNoteAndEventSupplierNoteController = new CreateEventNoteAndEventSupplierNoteController();

createEventNoteAndEventSupplierNoteRouter.post(
  '/',
  ensureAuthenticated,
  createEventNoteAndEventSupplierNoteController.create,
);

export default createEventNoteAndEventSupplierNoteRouter;
