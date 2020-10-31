import { Router } from 'express';

import UserConfirmationController from '@modules/users/infra/http/controllers/UserConfirmationsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userConfirmationRouter = Router();
const companyEmployeeConfirmationController = new UserConfirmationController();

// === $$ === $ ==> Employee Confirmation <== $ === $$ === //

userConfirmationRouter.post(
  '/',
  ensureAuthenticated,
  companyEmployeeConfirmationController.create,
);
userConfirmationRouter.put(
  '/:id',
  ensureAuthenticated,
  companyEmployeeConfirmationController.update,
);
userConfirmationRouter.get(
  '/:receiver_id/:sender_id',
  companyEmployeeConfirmationController.show,
);
userConfirmationRouter.get(
  '/receiver/:receiver_id',
  companyEmployeeConfirmationController.listReceiver,
);
userConfirmationRouter.get(
  '/sender/:sender_id',
  companyEmployeeConfirmationController.ListSender,
);
userConfirmationRouter.get('/:id', companyEmployeeConfirmationController.show);
userConfirmationRouter.delete(
  '/:id',
  ensureAuthenticated,
  companyEmployeeConfirmationController.delete,
);

export default userConfirmationRouter;
