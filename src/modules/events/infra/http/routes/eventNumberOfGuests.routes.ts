import { Router } from 'express';

import EventNumberOfGuestsController from '@modules/events/infra/http/controllers/EventNumberOfGuestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventNumberOfGuestsRouter = Router();
const eventNumberOfGuestsController = new EventNumberOfGuestsController();

eventNumberOfGuestsRouter.use(ensureAuthenticated);

eventNumberOfGuestsRouter.put(
  '/update/:event_id',
  eventNumberOfGuestsController.update,
);

export default eventNumberOfGuestsRouter;
