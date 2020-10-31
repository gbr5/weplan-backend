import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import UserContactInfosController from '@modules/users/infra/http/controllers/UserContactInfosController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const userscontroller = new ProfileController();
const userContactInfosController = new UserContactInfosController();

profileRouter.get('/', ensureAuthenticated, userscontroller.show);
profileRouter.put(
  '/:user_id',
  ensureAuthenticated,
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
  '/contact-info/add/:user_id',
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
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      contact_info: Joi.string().required(),
    },
  }),
  userContactInfosController.update,
);

profileRouter.get(
  '/contact-info/:user_id/',
  ensureAuthenticated,
  userContactInfosController.index,
);
profileRouter.get(
  '/contact-info/:user_id/:contact_type',
  ensureAuthenticated,
  userContactInfosController.show,
);

export default profileRouter;
