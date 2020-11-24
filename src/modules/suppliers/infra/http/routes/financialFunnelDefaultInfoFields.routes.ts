import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FinancialFunnelCardDefaultInfoFieldsController from '../controllers/FinancialFunnelCardDefaultInfoFieldsController';

const financialFunnelDefaultInfoFieldsRouter = Router();
const financialFunnelCardDefaultInfoFields = new FinancialFunnelCardDefaultInfoFieldsController();

financialFunnelDefaultInfoFieldsRouter.use(ensureAuthenticated);

// === Create Deafault Financial Funnel Card Info Field === //

financialFunnelDefaultInfoFieldsRouter.post(
  '/',
  financialFunnelCardDefaultInfoFields.create,
);

export default financialFunnelDefaultInfoFieldsRouter;
