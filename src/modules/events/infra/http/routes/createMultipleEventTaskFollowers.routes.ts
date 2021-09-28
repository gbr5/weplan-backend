import { Router } from 'express';

import CreateMultipleEventTaskFollowersController from '@modules/events/infra/http/controllers/CreateMultipleEventTaskFollowersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createMultipleEventTaskFollowers = Router();
const createMultipleEventTaskFollowersController = new CreateMultipleEventTaskFollowersController();

createMultipleEventTaskFollowers.use(ensureAuthenticated);

createMultipleEventTaskFollowers.post(
  '/',
  createMultipleEventTaskFollowersController.create,
);

export default createMultipleEventTaskFollowers;
