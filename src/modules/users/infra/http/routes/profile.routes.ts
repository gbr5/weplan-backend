import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const userscontroller = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', userscontroller.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  userscontroller.update,
);

export default profileRouter;
