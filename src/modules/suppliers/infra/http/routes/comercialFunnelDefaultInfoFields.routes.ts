import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ComercialFunnelCardDefaultInfoFieldsController from '../controllers/ComercialFunnelCardDefaultInfoFieldsController';

const comercialFunnelDefaultInfoFieldsRouter = Router();
const comercialFunnelCardDefaultInfoFields = new ComercialFunnelCardDefaultInfoFieldsController();

comercialFunnelDefaultInfoFieldsRouter.use(ensureAuthenticated);

// === Create Deafault Comercial Funnel Card Info Field === //

comercialFunnelDefaultInfoFieldsRouter.post(
  '/',
  comercialFunnelCardDefaultInfoFields.create,
);

export default comercialFunnelDefaultInfoFieldsRouter;
