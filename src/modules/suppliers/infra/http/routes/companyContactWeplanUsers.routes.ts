import { Router } from 'express';

import CompanyContactWeplanUsersController from '@modules/suppliers/infra/http/controllers/CompanyContactWeplanUsersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const companyContactWeplanUsersRouter = Router();
const companyContactWeplanUsersController = new CompanyContactWeplanUsersController();

// === $$ === $ ==> Contacts <== $ === $$ === //

companyContactWeplanUsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_contact_id: Joi.string().required(),
      user_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyContactWeplanUsersController.create,
);
companyContactWeplanUsersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyContactWeplanUsersController.update,
);
companyContactWeplanUsersRouter.get(
  '/:company_contact_id',
  ensureAuthenticated,
  companyContactWeplanUsersController.show,
);
companyContactWeplanUsersRouter.delete(
  '/:id',
  ensureAuthenticated,
  companyContactWeplanUsersController.delete,
);

export default companyContactWeplanUsersRouter;
