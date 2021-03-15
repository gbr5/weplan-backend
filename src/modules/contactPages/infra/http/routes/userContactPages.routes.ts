import { Router } from 'express';

import UserContactPagesController from '@modules/contactPages/infra/http/controllers/UserContactPagesController';
// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userContactPagesRouter = Router();
const userContactPagesController = new UserContactPagesController();

// userContactPagesRouter.use(ensureAuthenticated);

userContactPagesRouter.post('/', userContactPagesController.create);
userContactPagesRouter.get('/:slug', userContactPagesController.show);
// userContactPagesRouter.delete('/:id', userContactPagesController.delete);

export default userContactPagesRouter;
