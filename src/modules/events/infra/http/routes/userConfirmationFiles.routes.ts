import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserConfirmationFilesController from '@modules/users/infra/http/controllers/UserConfirmationFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userConfirmationFilesRouter = Router();
userConfirmationFilesRouter.use(ensureAuthenticated);

const userConfirmationFilesController = new UserConfirmationFilesController();

userConfirmationFilesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      file_id: Joi.string().required(),
      user_confirmation_id: Joi.string().required(),
    },
  }),
  userConfirmationFilesController.create,
);

userConfirmationFilesRouter.delete(
  '/:id',
  userConfirmationFilesController.delete,
);

export default userConfirmationFilesRouter;
