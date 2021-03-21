import { Router } from 'express';

import FormEmailNotificationRecipientsController from '@modules/forms/infra/http/controllers/FormEmailNotificationRecipientsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const formEmailNotificationRecipientsRouter = Router();
const formEmailNotificationRecipientsController = new FormEmailNotificationRecipientsController();

// formEmailNotificationRecipientsRouter.use(ensureAuthenticated);

formEmailNotificationRecipientsRouter.post(
  '/',
  ensureAuthenticated,
  formEmailNotificationRecipientsController.create,
);
formEmailNotificationRecipientsRouter.put(
  '/:id',
  formEmailNotificationRecipientsController.update,
);
formEmailNotificationRecipientsRouter.delete(
  '/:id',
  formEmailNotificationRecipientsController.delete,
);

export default formEmailNotificationRecipientsRouter;
