import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserBirthdateController from '@modules/users/infra/http/controllers/UserBirthdateController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userBirthdateRouter = Router();
const userBirthdateController = new UserBirthdateController();

userBirthdateRouter.use(ensureAuthenticated);

userBirthdateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      date: Joi.date(),
    },
  }),
  userBirthdateController.create,
);
userBirthdateRouter.get('/', userBirthdateController.show);
userBirthdateRouter.put(
  '/',
  celebrate({ [Segments.BODY]: { date: Joi.date() } }),
  userBirthdateController.update,
);
export default userBirthdateRouter;
