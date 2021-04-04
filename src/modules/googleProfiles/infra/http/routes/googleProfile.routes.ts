import { Router } from 'express';

import GoogleProfileController from '@modules/googleProfiles/infra/http/controllers/GoogleProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const googleProfileRouter = Router();
const googleProfileController = new GoogleProfileController();

googleProfileRouter.use(ensureAuthenticated);

googleProfileRouter.get('/', googleProfileController.list);

export default googleProfileRouter;
