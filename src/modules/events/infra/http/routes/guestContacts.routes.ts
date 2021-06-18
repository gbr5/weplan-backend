import { Router } from 'express';

import GuestContactsController from '@modules/events/infra/http/controllers/GuestContactsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const guestContactsRouter = Router();
const guestContactsController = new GuestContactsController();

guestContactsRouter.use(ensureAuthenticated);

guestContactsRouter.post('/', guestContactsController.create);
guestContactsRouter.get('/:guest_id', guestContactsController.index);
guestContactsRouter.put('/:id', guestContactsController.update);

guestContactsRouter.delete('/:id', guestContactsController.delete);

export default guestContactsRouter;
