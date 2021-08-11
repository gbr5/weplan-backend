import { Router } from 'express';

import EventSupplierBudgetsController from '@modules/suppliers/infra/http/controllers/EventSupplierBudgetsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventSupplierBudgetsRouter = Router();
const eventSupplierBudgetsController = new EventSupplierBudgetsController();

eventSupplierBudgetsRouter.post(
  '/',
  ensureAuthenticated,
  eventSupplierBudgetsController.create,
);
eventSupplierBudgetsRouter.put(
  '/',
  ensureAuthenticated,
  eventSupplierBudgetsController.update,
);
eventSupplierBudgetsRouter.get(
  '/:supplier_id',
  ensureAuthenticated,
  eventSupplierBudgetsController.index,
);
eventSupplierBudgetsRouter.delete(
  '/:id',
  ensureAuthenticated,
  eventSupplierBudgetsController.delete,
);

export default eventSupplierBudgetsRouter;
