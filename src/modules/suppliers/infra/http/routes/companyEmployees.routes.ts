import { Router } from 'express';

import CompanyEmployeesController from '@modules/suppliers/infra/http/controllers/CompanyEmployeesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const companyEmployeesRouter = Router();
const companyEmployeesController = new CompanyEmployeesController();

// === $$ === $ ==> Employees <== $ === $$ === //

companyEmployeesRouter.post(
  '/:company_id/:employee_id',
  ensureAuthenticated,
  companyEmployeesController.create,
);
companyEmployeesRouter.put(
  '/:id',
  ensureAuthenticated,
  companyEmployeesController.update,
);
companyEmployeesRouter.get(
  '/:company_id',
  ensureAuthenticated,
  companyEmployeesController.index,
);
companyEmployeesRouter.get(
  '/user/:employee_id',
  companyEmployeesController.listUserEmployee,
);
companyEmployeesRouter.get(
  '/employee/:employee_id/:company_id',
  companyEmployeesController.show,
);
companyEmployeesRouter.delete(
  '/:id',
  ensureAuthenticated,
  companyEmployeesController.delete,
);

export default companyEmployeesRouter;
