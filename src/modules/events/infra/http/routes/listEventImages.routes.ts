import { Router } from 'express';

import ListUserEventImagesController from '@modules/events/infra/http/controllers/ListUserEventImagesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listEventImagesRouter = Router();
const listEventImagesController = new ListUserEventImagesController();

listEventImagesRouter.use(ensureAuthenticated);

listEventImagesRouter.get('/', listEventImagesController.index);

export default listEventImagesRouter;
