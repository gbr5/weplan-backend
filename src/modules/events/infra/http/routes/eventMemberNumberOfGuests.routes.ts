import { Router } from 'express';

import EventMemberNumberOfGuestsController from '@modules/events/infra/http/controllers/EventMemberNumberOfGuestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventMemberNumberOfGuestsRouter = Router();
const eventMemberNumberOfGuestsController = new EventMemberNumberOfGuestsController();

eventMemberNumberOfGuestsRouter.use(ensureAuthenticated);

eventMemberNumberOfGuestsRouter.put(
  '/:member_id',
  eventMemberNumberOfGuestsController.update,
);

export default eventMemberNumberOfGuestsRouter;
