import { Router } from 'express';

import CompanyEmployeesController from '@modules/suppliers/infra/http/controllers/CompanyEmployeesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const listUserAsEmployeeRouter = Router();
const listUserAsEmployeeController = new CompanyEmployeesController();

listUserAsEmployeeRouter.use(ensureAuthenticated);

listUserAsEmployeeRouter.get('/', listUserAsEmployeeController.index);

export default listUserAsEmployeeRouter;
