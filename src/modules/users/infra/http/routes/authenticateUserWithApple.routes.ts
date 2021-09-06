import { Router } from 'express';

import AuthenticateUserWithAppleController from '@modules/users/infra/http/controllers/AuthenticateUserWithAppleController';

const authenticateUserWithAppleRouter = Router();
const authenticateUserWithAppleController = new AuthenticateUserWithAppleController();

authenticateUserWithAppleRouter.post(
  '/',
  authenticateUserWithAppleController.create,
);

export default authenticateUserWithAppleRouter;
