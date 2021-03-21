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
formSuccessMessageRouter.put('/:id', formSuccessMessageController.update);
formSuccessMessageRouter.delete('/:id', formSuccessMessageController.delete);

export default formSuccessMessageRouter;
