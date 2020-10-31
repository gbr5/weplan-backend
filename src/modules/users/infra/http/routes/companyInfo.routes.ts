import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import uploadConfig from '@config/upload';

import CompanyInfoController from '@modules/users/infra/http/controllers/CompanyInfoController';
import CompanyLogoController from '@modules/users/infra/http/controllers/CompanyLogoController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';

const companyInfoRouter = Router();
const upload = multer(uploadConfig.multer);
const companyInfoController = new CompanyInfoController();
const companyLogoController = new CompanyLogoController();

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
companyInfoRouter.get(
  '/:user_id',
  ensureAuthenticated,
  companyInfoController.show,
);
companyInfoRouter.put(
  '/edit/:user_id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      company_id: Joi.string().required(),
    },
  }),
  companyInfoController.update,
);

companyInfoRouter.patch(
  '/logo/:user_id',
  ensureAuthenticated,
  upload.single('logo'),
  companyLogoController.update,
);

export default companyInfoRouter;
