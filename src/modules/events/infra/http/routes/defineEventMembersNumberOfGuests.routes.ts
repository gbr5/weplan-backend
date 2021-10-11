import { Router } from 'express';

import DefineEventMembersNumberOfGuestsController from '@modules/events/infra/http/controllers/DefineEventMembersNumberOfGuestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const defineEventMembersNumberOfGuestsRouter = Router();
const defineEventMembersNumberOfGuestsController = new DefineEventMembersNumberOfGuestsController();

defineEventMembersNumberOfGuestsRouter.use(ensureAuthenticated);

defineEventMembersNumberOfGuestsRouter.put(
  '/',
  defineEventMembersNumberOfGuestsController.update,
);

export default defineEventMembersNumberOfGuestsRouter;
