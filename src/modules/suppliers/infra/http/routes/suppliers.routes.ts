import { Router } from 'express';

import SuppliersController from '@modules/suppliers/infra/http/controllers/SuppliersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();

suppliersRouter.use(ensureAuthenticated);

// === $$ === $ ==> Supplier <== $ === $$ === //

suppliersRouter.get('/:supplier_id', suppliersController.index);

export default suppliersRouter;
