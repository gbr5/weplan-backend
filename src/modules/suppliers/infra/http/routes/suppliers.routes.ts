import { Router } from 'express';

import SuppliersController from '@modules/suppliers/infra/http/controllers/SuppliersController';
import SupplierProductsController from '@modules/suppliers/infra/http/controllers/SupplierProductsController';
import CompanyMasterUsersController from '@modules/suppliers/infra/http/controllers/CompanyMasterUsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();
const companyMasterUsersController = new CompanyMasterUsersController();
const supplierProductsController = new SupplierProductsController();

suppliersRouter.use(ensureAuthenticated);

// === $$ === $ ==> Supplier <== $ === $$ === //

suppliersRouter.get('/:supplier_id', suppliersController.index);

// === $$ === $ ==> Supplier Products <== $ === $$ === //

suppliersRouter.post('/products', supplierProductsController.create);
suppliersRouter.get('/products/:user_id', supplierProductsController.index);
suppliersRouter.delete('/products/:id', supplierProductsController.delete);

// === $$ === $ ==>  Company Master Users  <== $ === $$ === //

suppliersRouter.post(
  '/master/user/:user_id',
  companyMasterUsersController.create,
);

suppliersRouter.get(
  '/master/users/:company_id',
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
  companyMasterUsersController.show,
);
suppliersRouter.put('/master/user/:id', companyMasterUsersController.update);
suppliersRouter.delete('/master/user/:id', companyMasterUsersController.delete);

export default suppliersRouter;
