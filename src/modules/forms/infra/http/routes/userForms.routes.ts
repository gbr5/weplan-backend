import { Router } from 'express';

import UserFormsController from '@modules/forms/infra/http/controllers/UserFormsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userFormsRouter = Router();
const userFormsController = new UserFormsController();

// userFormsRouter.use(ensureAuthenticated);

userFormsRouter.post('/', ensureAuthenticated, userFormsController.create);
userFormsRouter.get('/:name/:slug', userFormsController.show);
userFormsRouter.put('/:id', userFormsController.update);
userFormsRouter.delete('/:id', userFormsController.delete);

export default userFormsRouter;
