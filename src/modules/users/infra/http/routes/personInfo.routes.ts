import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PersonInfoController from '@modules/users/infra/http/controllers/PersonInfoController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const personInfoRouter = Router();
const personInfoController = new PersonInfoController();

personInfoRouter.use(ensureAuthenticated);

personInfoRouter.post('/', personInfoController.create);
personInfoRouter.get('/', personInfoController.show);
personInfoRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      person_id: Joi.string().required(),
    },
  }),
  personInfoController.update,
);

export default personInfoRouter;
