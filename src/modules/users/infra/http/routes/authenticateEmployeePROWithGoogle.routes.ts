import { Router } from 'express';

import AuthenticateEmployeePROWithGoogleController from '@modules/users/infra/http/controllers/AuthenticateEmployeePROWithGoogleController';

const authenticateEmployeePROWithGoogleRouter = Router();
const authenticateEmployeePROWithGoogleController = new AuthenticateEmployeePROWithGoogleController();

authenticateEmployeePROWithGoogleRouter.post(
  '/',
  authenticateEmployeePROWithGoogleController.create,
);

export default authenticateEmployeePROWithGoogleRouter;
