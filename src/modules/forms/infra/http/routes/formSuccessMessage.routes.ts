import { Router } from 'express';

import FormSuccessMessageController from '@modules/forms/infra/http/controllers/FormSuccessMessageController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const formSuccessMessageRouter = Router();
const formSuccessMessageController = new FormSuccessMessageController();

// formSuccessMessageRouter.use(ensureAuthenticated);

formSuccessMessageRouter.post(
  '/',
  ensureAuthenticated,
  formSuccessMessageController.create,
);
formSuccessMessageRouter.get('/:id', formSuccessMessageController.show);
formSuccessMessageRouter.put(
  '/:id',
  ensureAuthenticated,
  formSuccessMessageController.update,
);
formSuccessMessageRouter.delete(
  '/:id',
  ensureAuthenticated,
  formSuccessMessageController.delete,
);

export default formSuccessMessageRouter;
