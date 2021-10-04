import { Router } from 'express';

import CreateEventWePlanSupplierTaskController from '@modules/events/infra/http/controllers/CreateEventWePlanSupplierTaskController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createEventWePlanSupplierTaskRouter = Router();
const createEventWePlanSupplierTaskController = new CreateEventWePlanSupplierTaskController();

createEventWePlanSupplierTaskRouter.use(ensureAuthenticated);

createEventWePlanSupplierTaskRouter.post(
  '/',
  createEventWePlanSupplierTaskController.create,
);

export default createEventWePlanSupplierTaskRouter;
