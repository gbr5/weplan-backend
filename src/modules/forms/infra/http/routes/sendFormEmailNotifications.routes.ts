import { Router } from 'express';

import SendFormEmailNotificationsController from '@modules/forms/infra/http/controllers/SendFormEmailNotificationsController';

const sendFormEmailNotificationsRouter = Router();
const sendFormEmailNotificationsController = new SendFormEmailNotificationsController();

sendFormEmailNotificationsRouter.post(
  '/',
  sendFormEmailNotificationsController.post,
);

export default sendFormEmailNotificationsRouter;
