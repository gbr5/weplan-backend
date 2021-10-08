import { Router } from 'express';

import EventMembersNumberOfGuestsController from '@modules/events/infra/http/controllers/EventMembersNumberOfGuestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMembersNumberOfGuestsRouter = Router();
const eventMembersNumberOfGuestsController = new EventMembersNumberOfGuestsController();

eventMembersNumberOfGuestsRouter.use(ensureAuthenticated);

eventMembersNumberOfGuestsRouter.put(
  '/:event_id',
  eventMembersNumberOfGuestsController.update,
);

export default eventMembersNumberOfGuestsRouter;
