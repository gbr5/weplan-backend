import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EventIsDateDefinedController from '@modules/events/infra/http/controllers/EventIsDateDefinedController';

const eventIsDateDefinedRouter = Router();
const events = new EventIsDateDefinedController();

eventIsDateDefinedRouter.use(ensureAuthenticated);

eventIsDateDefinedRouter.put('/:event_id', events.update);

export default eventIsDateDefinedRouter;
