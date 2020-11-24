import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductionFunnelCardDefaultInfoFieldsController from '../controllers/ProductionFunnelCardDefaultInfoFieldsController';

const productionFunnelDefaultInfoFieldsRouter = Router();
const productionFunnelCardDefaultInfoFields = new ProductionFunnelCardDefaultInfoFieldsController();

productionFunnelDefaultInfoFieldsRouter.use(ensureAuthenticated);

// === Create Deafault Production Funnel Card Info Field === //

productionFunnelDefaultInfoFieldsRouter.post(
  '/',
  productionFunnelCardDefaultInfoFields.create,
);

export default productionFunnelDefaultInfoFieldsRouter;
