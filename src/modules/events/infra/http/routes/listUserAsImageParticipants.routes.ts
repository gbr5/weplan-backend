import { Router } from 'express';

import ListUserAsImageParticipantsController from '@modules/events/infra/http/controllers/ListUserAsImageParticipantsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listUserAsImageParticipantsRouter = Router();
const listUserAsImageParticipantsController = new ListUserAsImageParticipantsController();

listUserAsImageParticipantsRouter.use(ensureAuthenticated);

listUserAsImageParticipantsRouter.get(
  '/',
  listUserAsImageParticipantsController.index,
);

export default listUserAsImageParticipantsRouter;
