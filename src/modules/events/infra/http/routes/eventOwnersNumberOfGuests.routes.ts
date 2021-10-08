import { Router } from 'express';

import EventOwnersNumberOfGuestsController from '@modules/events/infra/http/controllers/EventOwnersNumberOfGuestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventOwnersNumberOfGuestsRouter = Router();
const eventOwnersNumberOfGuestsController = new EventOwnersNumberOfGuestsController();

eventOwnersNumberOfGuestsRouter.use(ensureAuthenticated);

eventOwnersNumberOfGuestsRouter.put(
  '/:event_id',
  eventOwnersNumberOfGuestsController.update,
);

export default eventOwnersNumberOfGuestsRouter;
