import { Router } from 'express';

import UserContactPagesController from '@modules/contactPages/infra/http/controllers/UserContactPagesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userContactPagesRouter = Router();
const userContactPagesController = new UserContactPagesController();

// userContactPagesRouter.use(ensureAuthenticated);

userContactPagesRouter.post(
  '/',
  ensureAuthenticated,
  userContactPagesController.create,
);
userContactPagesRouter.get('/:name/:slug', userContactPagesController.show);
userContactPagesRouter.put('/:id', userContactPagesController.update);
userContactPagesRouter.delete('/:id', userContactPagesController.delete);

export default userContactPagesRouter;
