import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectFunnelCardDefaultInfoFieldsController from '../controllers/ProjectFunnelCardDefaultInfoFieldsController';

const projectsFunnelDefaultInfoFieldsRouter = Router();
const projectFunnelCardDefaultInfoFields = new ProjectFunnelCardDefaultInfoFieldsController();

projectsFunnelDefaultInfoFieldsRouter.use(ensureAuthenticated);

// === Create Deafault Project Funnel Card Info Field === //

projectsFunnelDefaultInfoFieldsRouter.post(
  '/',
  projectFunnelCardDefaultInfoFields.create,
);

export default projectsFunnelDefaultInfoFieldsRouter;
