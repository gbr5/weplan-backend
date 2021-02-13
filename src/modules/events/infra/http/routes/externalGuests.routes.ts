import { Router } from 'express';

import ExternalGuestController from '@modules/events/infra/http/controllers/ExternalGuestController';

const externalGuestsRouter = Router();
const externalGuestController = new ExternalGuestController();

externalGuestsRouter.get('/:id', externalGuestController.show);
externalGuestsRouter.put('/:id', externalGuestController.update);

export default externalGuestsRouter;
