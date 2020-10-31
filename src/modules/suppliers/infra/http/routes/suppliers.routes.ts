import { Router } from 'express';

import SuppliersController from '@modules/suppliers/infra/http/controllers/SuppliersController';
import SupplierProductsController from '@modules/suppliers/infra/http/controllers/SupplierProductsController';
import CompanyMasterUsersController from '@modules/suppliers/infra/http/controllers/CompanyMasterUsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();
const companyMasterUsersController = new CompanyMasterUsersController();
const supplierProductsController = new SupplierProductsController();

// === $$ === $ ==> Supplier <== $ === $$ === //

suppliersRouter.get(
  '/:supplier_id',
  ensureAuthenticated,
  suppliersController.index,
);

// === $$ === $ ==> Supplier Products <== $ === $$ === //

suppliersRouter.post(
  '/products/:company_id',
  ensureAuthenticated,
  supplierProductsController.create,
);
suppliersRouter.get(
  '/products/:user_id',
  ensureAuthenticated,
  supplierProductsController.index,
);
suppliersRouter.delete(
  '/products/:id',
  ensureAuthenticated,
  supplierProductsController.delete,
);

// === $$ === $ ==>  Company Master Users  <== $ === $$ === //

suppliersRouter.post(
  '/master/user/:company_id/:user_id',
  companyMasterUsersController.create,
);

suppliersRouter.get(
  '/master/users/:company_id',
  ensureAuthenticated,
  companyMasterUsersController.index,
);

// === $$ === $ ==>  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  <== $ === $$ === //

// === $$ === $ ==>  Difference between route below & above  <== $ === $$ === //

// === $$ === $ ==>  ! Is the S at the of master and user !  <== $ === $$ === //

// === $$ === $ ==>  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  <== $ === $$ === //

suppliersRouter.get(
  '/masters/user/:user_id',
  companyMasterUsersController.listUserMasters,
);
suppliersRouter.get(
  '/master/user/:user_id/:company_id',
  ensureAuthenticated,
  companyMasterUsersController.show,
);
suppliersRouter.put(
  '/master/user/:id',
  ensureAuthenticated,
  companyMasterUsersController.update,
);
suppliersRouter.delete(
  '/master/user/:id',
  ensureAuthenticated,
  companyMasterUsersController.delete,
);

export default suppliersRouter;
