import { Router } from 'express';

import SendCompanyActivationEmailController from '@modules/users/infra/http/controllers/SendCompanyActivationEmailController';

const sendCompanyActivationEmailRouter = Router();
const sendCompanyActivationEmailController = new SendCompanyActivationEmailController();

sendCompanyActivationEmailRouter.post(
  '/',
  sendCompanyActivationEmailController.create,
);

export default sendCompanyActivationEmailRouter;
