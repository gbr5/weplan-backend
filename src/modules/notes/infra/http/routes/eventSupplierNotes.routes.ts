import { Router } from 'express';

import EventSupplierNotesController from '@modules/notes/infra/http/controllers/EventSupplierNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventSupplierNotesRouter = Router();
const eventSupplierController = new EventSupplierNotesController();

eventSupplierNotesRouter.post(
  '/',
  ensureAuthenticated,
  eventSupplierController.create,
);

eventSupplierNotesRouter.get(
  '/:supplier_id',
  ensureAuthenticated,
  eventSupplierController.list,
);
eventSupplierNotesRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventSupplierController.delete,
);

export default eventSupplierNotesRouter;
