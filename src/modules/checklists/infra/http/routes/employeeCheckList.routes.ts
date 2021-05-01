import { Router } from 'express';

import EmployeeCheckListController from '@modules/checklists/infra/http/controllers/EmployeeCheckListController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const employeeCheckListRouter = Router();
const employeeCheckListController = new EmployeeCheckListController();

employeeCheckListRouter.post(
  '/',
  ensureAuthenticated,
  employeeCheckListController.create,
);
employeeCheckListRouter.get(
  '/:employee_id',
  ensureAuthenticated,
  employeeCheckListController.show,
);

export default employeeCheckListRouter;
