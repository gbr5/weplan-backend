import { Router } from 'express';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userProfileRouter = Router();
const userscontroller = new UserProfileController();

userProfileRouter.get('/:user_id', ensureAuthenticated, userscontroller.show);

export default userProfileRouter;
