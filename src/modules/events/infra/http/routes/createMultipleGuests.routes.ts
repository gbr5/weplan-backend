import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateMultipleGuestsController from '../controllers/CreateMultipleGuestsController';

const createMultipleGuestsRouter = Router();
const createMultipleGuestsController = new CreateMultipleGuestsController();

createMultipleGuestsRouter.use(ensureAuthenticated);

createMultipleGuestsRouter.post(
  '/:event_id',
  createMultipleGuestsController.create,
);

export default createMultipleGuestsRouter;
