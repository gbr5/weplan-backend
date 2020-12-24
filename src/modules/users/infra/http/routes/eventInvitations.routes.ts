import { Router } from 'express';

import EventInvitationsController from '@modules/users/infra/http/controllers/EventInvitationsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventInvitationsRouter = Router();
const eventInvitationsController = new EventInvitationsController();

// === $$ === $ ==> Employee Confirmation <== $ === $$ === //

eventInvitationsRouter.post(
  '/',
  ensureAuthenticated,
  eventInvitationsController.create,
);

export default eventInvitationsRouter;
