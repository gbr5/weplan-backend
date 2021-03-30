import { Router } from 'express';

import AuthenticateUserWithGoogleController from '@modules/users/infra/http/controllers/AuthenticateUserWithGoogleController';

const authenticateUserWithGoogleRouter = Router();
const authenticateUserWithGoogleController = new AuthenticateUserWithGoogleController();

authenticateUserWithGoogleRouter.post(
  '/',
  authenticateUserWithGoogleController.create,
);

export default authenticateUserWithGoogleRouter;
