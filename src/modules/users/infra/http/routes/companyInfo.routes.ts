import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CompanyInfoController from '@modules/users/infra/http/controllers/CompanyInfoController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const companyInfoRouter = Router();
const companyInfoController = new CompanyInfoController();

companyInfoRouter.use(ensureAuthenticated);

companyInfoRouter.post('/', companyInfoController.create);
companyInfoRouter.get('/', companyInfoController.show);
companyInfoRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      company_id: Joi.string().required(),
    },
  }),
  companyInfoController.update,
);

export default companyInfoRouter;
