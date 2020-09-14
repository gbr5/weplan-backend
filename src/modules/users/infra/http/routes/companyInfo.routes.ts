import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CompanyInfoController from '@modules/users/infra/http/controllers/CompanyInfoController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const companyInfoRouter = Router();
const companyInfoController = new CompanyInfoController();

companyInfoRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      company_id: Joi.string().required(),
      user_id: Joi.string().required(),
    },
  }),
  companyInfoController.create,
);
companyInfoRouter.get('/', ensureAuthenticated, companyInfoController.show);
companyInfoRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      company_id: Joi.string().required(),
    },
  }),
  companyInfoController.update,
);

export default companyInfoRouter;
