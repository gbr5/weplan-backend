import { Router } from 'express';

import EventBudgetController from '@modules/events/infra/http/controllers/EventBudgetController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const eventBudgetRouter = Router();
const eventBudgetController = new EventBudgetController();

eventBudgetRouter.use(ensureAuthenticated);

eventBudgetRouter.post('/', eventBudgetController.create);
eventBudgetRouter.put('/:id', eventBudgetController.update);
eventBudgetRouter.get('/:event_id', eventBudgetController.show);
eventBudgetRouter.delete('/:id', eventBudgetController.delete);

export default eventBudgetRouter;
