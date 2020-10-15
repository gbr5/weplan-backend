import { Router } from 'express';

import CompanyEmployeesController from '@modules/suppliers/infra/http/controllers/CompanyEmployeesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const supplierEmployeesRouter = Router();
const companyEmployeesController = new CompanyEmployeesController();

// === $$ === $ ==> Supplier <== $ === $$ === //

supplierEmployeesRouter.post(
  '/:employee_id',
  celebrate({
    [Segments.BODY]: {
      position: Joi.string().required(),
    },
  }),
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

export default supplierEmployeesRouter;
