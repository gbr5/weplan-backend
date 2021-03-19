import { Router } from 'express';

import UserFormsController from '@modules/forms/infra/http/controllers/UserFormsController';

const externalPageUserFormsRouter = Router();
const externalPageUserFormsController = new UserFormsController();

externalPageUserFormsRouter.get(
  '/:name/:slug',
  externalPageUserFormsController.show,
);

export default externalPageUserFormsRouter;
