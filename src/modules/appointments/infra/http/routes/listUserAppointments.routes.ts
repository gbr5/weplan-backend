import { Router } from 'express';

import ListUserAppointmentsController from '@modules/appointments/infra/http/controllers/ListUserAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listUserAppointmentsRouter = Router();
const listUserAppointmentsController = new ListUserAppointmentsController();

listUserAppointmentsRouter.use(ensureAuthenticated);

listUserAppointmentsRouter.get(
  '/by-date',
  listUserAppointmentsController.index,
);
listUserAppointmentsRouter.get(
  '/by-month',
  listUserAppointmentsController.indexByMonth,
);

export default listUserAppointmentsRouter;
