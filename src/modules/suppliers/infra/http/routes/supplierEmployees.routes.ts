import { Router } from 'express';

import CompanyEmployeesController from '@modules/suppliers/infra/http/controllers/CompanyEmployeesController';
import CompanyEmployeeConfirmationController from '@modules/suppliers/infra/http/controllers/CompanyEmployeeConfirmationController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const supplierEmployeesRouter = Router();
const companyEmployeesController = new CompanyEmployeesController();
const companyEmployeeConfirmationController = new CompanyEmployeeConfirmationController();

// === $$ === $ ==> Supplier <== $ === $$ === //

supplierEmployeesRouter.post(
  '/:employee_id',
  ensureAuthenticated,
  companyEmployeesController.create,
);
supplierEmployeesRouter.get(
  '/:company_id',
  ensureAuthenticated,
  companyEmployeesController.index,
);
supplierEmployeesRouter.get(
  '/employee/:employee_id',
  companyEmployeesController.show,
);
supplierEmployeesRouter.delete(
  '/:id',
  ensureAuthenticated,
  companyEmployeesController.delete,
);

// === $$ === $ ==> Supplier <== $ === $$ === //

supplierEmployeesRouter.post(
  '/user/confirmation/:company_employee_id',
  ensureAuthenticated,
  companyEmployeeConfirmationController.create,
);
supplierEmployeesRouter.put(
  '/user/confirmation/:id',
  ensureAuthenticated,
  companyEmployeeConfirmationController.update,
);
supplierEmployeesRouter.get(
  '/user/confirmation/employee/:company_employee_id',
  companyEmployeeConfirmationController.show,
);
supplierEmployeesRouter.delete(
  '/user/confirmation/:id',
  ensureAuthenticated,
  companyEmployeeConfirmationController.delete,
);

export default supplierEmployeesRouter;
