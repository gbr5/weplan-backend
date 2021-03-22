import { Router } from 'express';

import FormLandingPageController from '@modules/forms/infra/http/controllers/FormLandingPageController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const formLandingPageRouter = Router();
const formLandingPageController = new FormLandingPageController();

// formLandingPageRouter.use(ensureAuthenticated);

formLandingPageRouter.post(
  '/',
  ensureAuthenticated,
  formLandingPageController.create,
);
formLandingPageRouter.put('/:id', formLandingPageController.update);
formLandingPageRouter.delete('/:id', formLandingPageController.delete);

export default formLandingPageRouter;
