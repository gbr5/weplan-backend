import { Router } from 'express';

import EventOwnerNumberOfGuestsController from '@modules/events/infra/http/controllers/EventOwnerNumberOfGuestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventOwnerNumberOfGuestsRouter = Router();
const eventOwnerNumberOfGuestsController = new EventOwnerNumberOfGuestsController();

eventOwnerNumberOfGuestsRouter.use(ensureAuthenticated);

eventOwnerNumberOfGuestsRouter.put(
  '/:owner_id',
  eventOwnerNumberOfGuestsController.update,
);

export default eventOwnerNumberOfGuestsRouter;
