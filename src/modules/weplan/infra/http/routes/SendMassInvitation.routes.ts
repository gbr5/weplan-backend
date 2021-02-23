import { Router } from 'express';

import SendMassInvitationController from '@modules/weplan/infra/http/controllers/SendMassInvitationController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const sendMassInvitationRouter = Router();
const endMassInvitationRouterController = new SendMassInvitationController();

sendMassInvitationRouter.use(ensureAuthenticated);

sendMassInvitationRouter.post('/', endMassInvitationRouterController.create);

export default sendMassInvitationRouter;
