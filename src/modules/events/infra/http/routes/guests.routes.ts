import { Router } from 'express';

import GuestConfirmationController from '@modules/events/infra/http/controllers/GuestConfirmationController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import GuestsController from '../controllers/GuestsController';

const guestsRouter = Router();
const guestsController = new GuestsController();
const guestConfirmationController = new GuestConfirmationController();

guestsRouter.use(ensureAuthenticated);

guestsRouter.get('/:id', guestsController.show);
guestsRouter.put('/confirmation/:id', guestConfirmationController.update);

export default guestsRouter;
