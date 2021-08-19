import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateMultipleWePlanGuestsController from '../controllers/CreateMultipleWePlanGuestsController';

const createMultipleWePlanGuestsRouter = Router();
const createMultipleWePlanGuestsController = new CreateMultipleWePlanGuestsController();

createMultipleWePlanGuestsRouter.use(ensureAuthenticated);

createMultipleWePlanGuestsRouter.post(
  '/:event_id',
  createMultipleWePlanGuestsController.create,
);

export default createMultipleWePlanGuestsRouter;
