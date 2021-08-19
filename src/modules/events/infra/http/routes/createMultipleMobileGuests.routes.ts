import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateMultipleMobileGuestsController from '../controllers/CreateMultipleMobileGuestsController';

const createMultipleMobileGuestsRouter = Router();
const createMultipleMobileGuestsController = new CreateMultipleMobileGuestsController();

createMultipleMobileGuestsRouter.use(ensureAuthenticated);

createMultipleMobileGuestsRouter.post(
  '/:event_id',
  createMultipleMobileGuestsController.create,
);

export default createMultipleMobileGuestsRouter;
