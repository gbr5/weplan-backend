import { Router } from 'express';

import EventInspirationImagesController from '@modules/events/infra/http/controllers/EventInspirationImagesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventInspirationImagesRouter = Router();
const eventInspirationImagesController = new EventInspirationImagesController();

eventInspirationImagesRouter.use(ensureAuthenticated);

eventInspirationImagesRouter.post('/', eventInspirationImagesController.create);
eventInspirationImagesRouter.get(
  '/:event_id',
  eventInspirationImagesController.list,
);
eventInspirationImagesRouter.delete(
  '/:id',
  eventInspirationImagesController.delete,
);

export default eventInspirationImagesRouter;
