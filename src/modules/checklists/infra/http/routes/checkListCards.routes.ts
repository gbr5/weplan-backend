import { Router } from 'express';

import CheckListCardsController from '@modules/checklists/infra/http/controllers/CheckListCardsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const checkListCardsRouter = Router();
const checkListCardsController = new CheckListCardsController();

checkListCardsRouter.get(
  '/:check_list_id',
  ensureAuthenticated,
  checkListCardsController.index,
);

export default checkListCardsRouter;
