import { Router } from 'express';

import EventDateVotesController from '@modules/events/infra/http/controllers/EventDateVotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventDateVotesRouter = Router();
const eventDateVotesController = new EventDateVotesController();

eventDateVotesRouter.use(ensureAuthenticated);

eventDateVotesRouter.post('/', eventDateVotesController.create);
eventDateVotesRouter.delete('/:id', eventDateVotesController.delete);

export default eventDateVotesRouter;
