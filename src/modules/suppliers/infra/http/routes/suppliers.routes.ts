import { Router } from 'express';

import SuppliersController from '@modules/suppliers/infra/http/controllers/SuppliersController';
import SupplierProductsController from '@modules/suppliers/infra/http/controllers/SupplierProductsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();
const supplierProductsController = new SupplierProductsController();

suppliersRouter.use(ensureAuthenticated);

// === $$ === $ ==> Supplier <== $ === $$ === //

suppliersRouter.get('/:supplier_id', suppliersController.index);

// === $$ === $ ==> Supplier Products <== $ === $$ === //

suppliersRouter.post('/products', supplierProductsController.create);
suppliersRouter.get('/products/:user_id', supplierProductsController.index);
suppliersRouter.delete('/products/:id', supplierProductsController.delete);

export default suppliersRouter;
