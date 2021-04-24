import { Router } from 'express';

import ListInactiveComercialCardsController from '@modules/suppliers/infra/http/controllers/ListInactiveComercialCardsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listInactiveComercialCardsRouter = Router();
const listInactiveComercialCardsController = new ListInactiveComercialCardsController();

listInactiveComercialCardsRouter.use(ensureAuthenticated);

listInactiveComercialCardsRouter.get(
  '/:funnel_id',
  listInactiveComercialCardsController.index,
);

export default listInactiveComercialCardsRouter;
