import { Router } from 'express';

import ListWPGuestConfirmationController from '@modules/users/infra/http/controllers/ListWPGuestConfirmationsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const wpGuestConfirmationsRouter = Router();
const listWPGuestConfirmationController = new ListWPGuestConfirmationController();

// === $$ === $ ==> Employee Confirmation <== $ === $$ === //

wpGuestConfirmationsRouter.get(
  '/:wp_guest_id',
  ensureAuthenticated,
  listWPGuestConfirmationController.index,
);

export default wpGuestConfirmationsRouter;
