import { Router } from 'express';

import CreateEventSupplierNoteAndTransactionNoteController from '@modules/notes/infra/http/controllers/CreateEventSupplierNoteAndTransactionNoteController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createEventSupplierNoteAndTransactionNoteRouter = Router();
const createEventSupplierNoteAndTransactionNoteController = new CreateEventSupplierNoteAndTransactionNoteController();

createEventSupplierNoteAndTransactionNoteRouter.post(
  '/',
  ensureAuthenticated,
  createEventSupplierNoteAndTransactionNoteController.create,
);

export default createEventSupplierNoteAndTransactionNoteRouter;
