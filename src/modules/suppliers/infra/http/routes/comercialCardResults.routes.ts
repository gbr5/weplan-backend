import { Router } from 'express';

import ComercialCardResultsController from '@modules/suppliers/infra/http/controllers/ComercialCardResultsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const comercialCardResultsRouter = Router();
const comercialCardResultsController = new ComercialCardResultsController();

comercialCardResultsRouter.use(ensureAuthenticated);

comercialCardResultsRouter.post('/', comercialCardResultsController.create);

comercialCardResultsRouter.get(
  '/:card_id',
  comercialCardResultsController.show,
);

comercialCardResultsRouter.put('/:id', comercialCardResultsController.update);
comercialCardResultsRouter.delete(
  '/:id',
  comercialCardResultsController.delete,
);

export default comercialCardResultsRouter;
