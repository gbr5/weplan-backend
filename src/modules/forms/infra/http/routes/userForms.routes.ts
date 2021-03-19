import { Router } from 'express';

import UserFormsController from '@modules/forms/infra/http/controllers/UserFormsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userFormsRouter = Router();
const userFormsController = new UserFormsController();

userFormsRouter.use(ensureAuthenticated);

userFormsRouter.post('/', userFormsController.create);
userFormsRouter.get('/show/:id', userFormsController.show);
userFormsRouter.get('/', userFormsController.list);
userFormsRouter.put('/:id', userFormsController.update);
userFormsRouter.delete('/:id', userFormsController.delete);

export default userFormsRouter;
