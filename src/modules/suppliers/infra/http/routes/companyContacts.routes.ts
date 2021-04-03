import { Router } from 'express';

import CompanyContactsController from '@modules/suppliers/infra/http/controllers/CompanyContactsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import CompanyContactInfosController from '../controllers/CompanyContactInfosController';

const companyContactsRouter = Router();
const companyContactsController = new CompanyContactsController();
const companyContactInfosController = new CompanyContactInfosController();

// === $$ === $ ==> Contacts <== $ === $$ === //

companyContactsRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     company_id: Joi.string().required(),
  //     name: Joi.string().required(),
  //     family_name: Joi.string(),
  //     description: Joi.string().required(),
  //     company_contact_type: Joi.string().required(),
  //     weplanUser: Joi.boolean().required(),
  //     isCompany: Joi.boolean().required(),
  //   },
  // }),
  companyContactsController.create,
);
companyContactsRouter.put(
  '/name/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyContactsController.updateName,
);
companyContactsRouter.put(
  '/family-name/:id',
  celebrate({
    [Segments.BODY]: {
      family_name: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyContactsController.updateFamilyName,
);
companyContactsRouter.put(
  '/description/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyContactsController.updateDescription,
);
companyContactsRouter.put(
  '/type/:id',
  celebrate({
    [Segments.BODY]: {
      company_contact_type: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyContactsController.updateCompanyContactType,
);
companyContactsRouter.put(
  '/weplan-user/:id',
  ensureAuthenticated,
  companyContactsController.updateWeplanUser,
);
companyContactsRouter.put(
  '/is-company/:id',
  ensureAuthenticated,
  companyContactsController.updateIsCompany,
);
companyContactsRouter.put(
  '/is-new/:id',
  ensureAuthenticated,
  companyContactsController.updateIsNew,
);
companyContactsRouter.get(
  '/:company_id',
  ensureAuthenticated,
  companyContactsController.index,
);
companyContactsRouter.delete(
  '/:id',
  ensureAuthenticated,
  companyContactsController.delete,
);

// === $$ === $ ==> Contact Infos <== $ === $$ === //

companyContactsRouter.post(
  '/info/',
  celebrate({
    [Segments.BODY]: {
      company_contact_id: Joi.string().required(),
      info_type: Joi.string().required(),
      info: Joi.string().required(),
    },
  }),
  companyContactInfosController.create,
);
companyContactsRouter.put(
  '/info/:id',
  celebrate({
    [Segments.BODY]: {
      info_type: Joi.string().required(),
      info: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyContactInfosController.update,
);
companyContactsRouter.get(
  '/info/:company_contact_id',
  ensureAuthenticated,
  companyContactInfosController.index,
);
companyContactsRouter.delete(
  '/info/:id',
  ensureAuthenticated,
  companyContactInfosController.delete,
);

export default companyContactsRouter;
