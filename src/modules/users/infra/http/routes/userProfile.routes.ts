import { Router } from 'express';

import UserProfileController from '@modules/users/infra/http/controllers/UserProfileController';

const userProfileRouter = Router();
const userscontroller = new UserProfileController();

userProfileRouter.get('/:email', userscontroller.show);

export default userProfileRouter;
