import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import UserContactInfosController from '@modules/users/infra/http/controllers/UserContactInfosController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const userscontroller = new ProfileController();
const userContactInfosController = new UserContactInfosController();

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

// === User Contact Info === //

profileRouter.post(
  '/contact-info',
  celebrate({
    [Segments.BODY]: {
      contact_info: Joi.string().required(),
      contact_type: Joi.string().required(),
    },
  }),
  userContactInfosController.create,
);

profileRouter.put(
  '/contact-info/:user_id/:contact_type',
  celebrate({
    [Segments.BODY]: {
      contact_info: Joi.string().required(),
    },
  }),
  userContactInfosController.update,
);

profileRouter.get('/contact-info/:user_id/', userContactInfosController.index);
profileRouter.get(
  '/contact-info/:user_id/:contact_type',
  userContactInfosController.show,
);

export default profileRouter;
