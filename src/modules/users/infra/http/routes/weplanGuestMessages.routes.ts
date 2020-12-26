import { Router } from 'express';

import WePlanGuestMessagesController from '@modules/users/infra/http/controllers/WePlanGuestMessagesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const weplanGuestMessagesRouter = Router();
const weplanGuestMessagesController = new WePlanGuestMessagesController();

// === $$ === $ ==> WePlan Guest Messages <== $ === $$ === //

weplanGuestMessagesRouter.post(
  '/',
  ensureAuthenticated,
  weplanGuestMessagesController.create,
);

weplanGuestMessagesRouter.get(
  '/:wp_guest_id',
  ensureAuthenticated,
  weplanGuestMessagesController.index,
);

export default weplanGuestMessagesRouter;
