import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventDatesVotingController from '@modules/events/infra/http/controllers/EventDatesVotingController';

const eventDatesVotingRouter = Router();
const events = new EventDatesVotingController();

eventDatesVotingRouter.use(ensureAuthenticated);

eventDatesVotingRouter.put('/:event_id', events.update);

export default eventDatesVotingRouter;
