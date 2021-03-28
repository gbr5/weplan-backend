import { Router } from 'express';

import ExternalPageUserFormsController from '@modules/forms/infra/http/controllers/ExternalPageUserFormsController';

const externalPageUserFormsRouter = Router();
const externalPageUserFormsController = new ExternalPageUserFormsController();

externalPageUserFormsRouter.get('/:id', externalPageUserFormsController.show);

export default externalPageUserFormsRouter;
