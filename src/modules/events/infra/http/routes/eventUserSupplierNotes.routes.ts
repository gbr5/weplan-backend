import { Router } from 'express';

import EventUserSupplierNotesController from '@modules/events/infra/http/controllers/EventUserSupplierNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventUserSupplierNotesRouter = Router();
const eventUserSupplierNotesController = new EventUserSupplierNotesController();

eventUserSupplierNotesRouter.use(ensureAuthenticated);

eventUserSupplierNotesRouter.post('/', eventUserSupplierNotesController.create);
eventUserSupplierNotesRouter.get(
  '/:event_supplier_id',
  eventUserSupplierNotesController.list,
);
eventUserSupplierNotesRouter.delete(
  '/:id',
  eventUserSupplierNotesController.delete,
);

export default eventUserSupplierNotesRouter;
