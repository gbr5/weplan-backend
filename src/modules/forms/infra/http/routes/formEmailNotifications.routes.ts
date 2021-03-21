import { Router } from 'express';

import FormEmailNotificationsController from '@modules/forms/infra/http/controllers/FormEmailNotificationsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const formEmailNotificationsRouter = Router();
const formEmailNotificationsController = new FormEmailNotificationsController();

// formEmailNotificationsRouter.use(ensureAuthenticated);

formEmailNotificationsRouter.post(
  '/',
  ensureAuthenticated,
  formEmailNotificationsController.create,
);
formEmailNotificationsRouter.put(
  '/:id',
  formEmailNotificationsController.update,
);
formEmailNotificationsRouter.delete(
  '/:id',
  formEmailNotificationsController.delete,
);

export default formEmailNotificationsRouter;
