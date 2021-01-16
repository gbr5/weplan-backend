import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventDateVotingTypeController from '@modules/events/infra/http/controllers/EventDateVotingTypeController';

const eventDateVotingTypeRouter = Router();
const events = new EventDateVotingTypeController();

eventDateVotingTypeRouter.use(ensureAuthenticated);

eventDateVotingTypeRouter.put('/:event_id', events.update);

export default eventDateVotingTypeRouter;
