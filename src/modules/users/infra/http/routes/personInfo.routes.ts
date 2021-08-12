import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PersonInfoController from '@modules/users/infra/http/controllers/PersonInfoController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const personInfoRouter = Router();
const personInfoController = new PersonInfoController();

personInfoRouter.post(
  '/:user_id',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string(),
      person_id: Joi.string(),
    },
  }),
  personInfoController.create,
);
personInfoRouter.get(
  '/:user_id',
  ensureAuthenticated,
  personInfoController.show,
);
personInfoRouter.get(
  '/:first_name/:last_name',
  personInfoController.findByFirstAndLastName,
);
personInfoRouter.put(
  '/edit',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string(),
      last_name: Joi.string(),
      person_id: Joi.string(),
    },
  }),
  personInfoController.update,
);

export default personInfoRouter;
