import { Router } from 'express';

import EventImagesController from '@modules/events/infra/http/controllers/EventImagesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventImagesRouter = Router();
const eventImagesController = new EventImagesController();

eventImagesRouter.use(ensureAuthenticated);

eventImagesRouter.post('/', eventImagesController.create);
eventImagesRouter.get('/:event_id', eventImagesController.list);
eventImagesRouter.delete('/:id', eventImagesController.delete);

export default eventImagesRouter;
