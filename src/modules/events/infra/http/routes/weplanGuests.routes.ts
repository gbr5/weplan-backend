import { Router } from 'express';

import WeplanGuestsController from '@modules/events/infra/http/controllers/WeplanGuestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const weplanGuestsRouter = Router();
const weplanGuestsController = new WeplanGuestsController();

weplanGuestsRouter.use(ensureAuthenticated);

weplanGuestsRouter.post('/', weplanGuestsController.create);
weplanGuestsRouter.get('/:event_id', weplanGuestsController.index);
weplanGuestsRouter.get('/list/user/', weplanGuestsController.listUser);
weplanGuestsRouter.delete('/:id', weplanGuestsController.delete);

export default weplanGuestsRouter;
