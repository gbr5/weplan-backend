import { Router } from 'express';

import SuppliersController from '@modules/suppliers/infra/http/controllers/SuppliersController';
import CompanyEmployeesController from '@modules/suppliers/infra/http/controllers/CompanyEmployeesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();
const companyEmployeesController = new CompanyEmployeesController();

suppliersRouter.use(ensureAuthenticated);

// === $$ === $ ==> Supplier <== $ === $$ === //

suppliersRouter.get('/:supplier_id', suppliersController.index);

// === $$ === $ ==> Supplier <== $ === $$ === //

suppliersRouter.post(
  '/employees/:employee_id',
  celebrate({
    [Segments.BODY]: {
      position: Joi.string().required(),
    },
  }),
  companyEmployeesController.create,
);
suppliersRouter.get('/employees/:company_id', companyEmployeesController.index);
suppliersRouter.delete('/employees/:id', companyEmployeesController.delete);

export default suppliersRouter;
