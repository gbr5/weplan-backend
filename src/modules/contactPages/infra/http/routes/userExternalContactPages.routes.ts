import { Router } from 'express';

import UserExternalContactPagesController from '@modules/contactPages/infra/http/controllers/UserExternalContactPagesController';

const userExternalContactPagesRouter = Router();
const userExternalContactPagesController = new UserExternalContactPagesController();

userExternalContactPagesRouter.get(
  '/:name/:slug',
  userExternalContactPagesController.show,
);

export default userExternalContactPagesRouter;
