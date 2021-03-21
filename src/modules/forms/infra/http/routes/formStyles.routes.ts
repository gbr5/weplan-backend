import { Router } from 'express';

import FormStylesController from '@modules/forms/infra/http/controllers/FormStylesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const formStylesRouter = Router();
const formStylesController = new FormStylesController();

// formStylesRouter.use(ensureAuthenticated);

formStylesRouter.post('/', ensureAuthenticated, formStylesController.create);
formStylesRouter.put('/:id', formStylesController.update);
formStylesRouter.delete('/:id', formStylesController.delete);

export default formStylesRouter;
