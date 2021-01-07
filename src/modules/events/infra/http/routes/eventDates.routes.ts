import { Router } from 'express';

import EventDatesController from '@modules/events/infra/http/controllers/EventDatesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventDatesRouter = Router();
const eventDatesController = new EventDatesController();

eventDatesRouter.use(ensureAuthenticated);

eventDatesRouter.post('/', eventDatesController.create);
eventDatesRouter.put('/:id', eventDatesController.update);
eventDatesRouter.delete('/:id', eventDatesController.delete);

export default eventDatesRouter;
