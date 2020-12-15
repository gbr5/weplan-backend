import { Router } from 'express';

import GuestContactInfosController from '@modules/events/infra/http/controllers/GuestContactInfosController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const guestContactInfosRouter = Router();
const guestContactInfosController = new GuestContactInfosController();

guestContactInfosRouter.use(ensureAuthenticated);

guestContactInfosRouter.post('/', guestContactInfosController.create);
guestContactInfosRouter.get('/:guest_id', guestContactInfosController.index);
guestContactInfosRouter.put('/:id', guestContactInfosController.update);

guestContactInfosRouter.delete('/:id', guestContactInfosController.delete);

export default guestContactInfosRouter;
