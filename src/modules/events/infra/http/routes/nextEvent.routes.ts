import { Router } from 'express';

import ShowMyNextEventController from '@modules/events/infra/http/controllers/ShowMyNextEventController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const nextEventRouter = Router();
const nextEventController = new ShowMyNextEventController();

nextEventRouter.use(ensureAuthenticated);

nextEventRouter.get('/', nextEventController.show);

export default nextEventRouter;
