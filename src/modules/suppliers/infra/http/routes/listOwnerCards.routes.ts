import { Router } from 'express';

import ListOwnerCardsController from '@modules/suppliers/infra/http/controllers/ListOwnerCardsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listOwnerCardsRouter = Router();
const listOwnerCardsController = new ListOwnerCardsController();

listOwnerCardsRouter.use(ensureAuthenticated);

listOwnerCardsRouter.get('/:card_owner', listOwnerCardsController.index);

export default listOwnerCardsRouter;
