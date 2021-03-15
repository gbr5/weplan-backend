import { Router } from 'express';

import FormFieldsController from '@modules/forms/infra/http/controllers/FormFieldsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const formFieldsRouter = Router();
const formFieldsController = new FormFieldsController();

// formFieldsRouter.use(ensureAuthenticated);

formFieldsRouter.post('/', ensureAuthenticated, formFieldsController.create);
formFieldsRouter.put('/:id', formFieldsController.update);
formFieldsRouter.delete('/:id', formFieldsController.delete);

export default formFieldsRouter;
