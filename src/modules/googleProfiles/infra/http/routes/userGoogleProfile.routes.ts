import { Router } from 'express';

import UserGoogleProfileController from '@modules/googleProfiles/infra/http/controllers/UserGoogleProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userGoogleProfileRouter = Router();
const userGoogleProfileController = new UserGoogleProfileController();

userGoogleProfileRouter.use(ensureAuthenticated);

userGoogleProfileRouter.post('/', userGoogleProfileController.create);
userGoogleProfileRouter.get('/:user_id', userGoogleProfileController.show);
userGoogleProfileRouter.delete('/:id', userGoogleProfileController.delete);

export default userGoogleProfileRouter;
