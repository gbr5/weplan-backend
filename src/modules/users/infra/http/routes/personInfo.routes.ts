import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PersonInfoController from '@modules/users/infra/http/controllers/PersonInfoController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const companyInfoRouter = Router();
const companyInfoController = new PersonInfoController();

companyInfoRouter.use(ensureAuthenticated);

companyInfoRouter.post('/', companyInfoController.create);
companyInfoRouter.get('/', companyInfoController.show);
companyInfoRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      person_id: Joi.string().required(),
    },
  }),
  companyInfoController.update,
);

export default companyInfoRouter;
