import { Router } from 'express';

import EmployeeManagementModuleController from '@modules/users/infra/http/controllers/EmployeeManagementModulesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const employeeManagementModuleRouter = Router();
const employeeManagementModuleController = new EmployeeManagementModuleController();

employeeManagementModuleRouter.use(ensureAuthenticated);

// === $$ === $ ==> Employee Confirmation <== $ === $$ === //

employeeManagementModuleRouter.get(
  '/:employee_id',
  employeeManagementModuleController.list,
);

export default employeeManagementModuleRouter;
