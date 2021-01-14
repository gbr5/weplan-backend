import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventIsPublishedController from '@modules/events/infra/http/controllers/EventIsPublishedController';

const eventIsPublishedRouter = Router();
const events = new EventIsPublishedController();

eventIsPublishedRouter.use(ensureAuthenticated);

eventIsPublishedRouter.put('/:event_id', events.update);

export default eventIsPublishedRouter;
