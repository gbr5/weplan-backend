import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AssociateUserToEventGuestController from '../controllers/AssociateUserToEventGuestController';

const associateUserToEventGuestRouter = Router();
const associateUserToEventGuestController = new AssociateUserToEventGuestController();

associateUserToEventGuestRouter.use(ensureAuthenticated);

associateUserToEventGuestRouter.post(
  '/',
  associateUserToEventGuestController.post,
);

export default associateUserToEventGuestRouter;
