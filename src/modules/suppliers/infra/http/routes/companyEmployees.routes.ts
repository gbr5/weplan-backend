import { Router } from 'express';

import CompanyEmployeesController from '@modules/suppliers/infra/http/controllers/CompanyEmployeesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const companyEmployeesRouter = Router();
const companyEmployeesController = new CompanyEmployeesController();

// === $$ === $ ==> Employees <== $ === $$ === //

companyEmployeesRouter.post(
  '/:company_id/:employee_id',
  celebrate({
    [Segments.BODY]: {
      access_key: Joi.string().required(),
      password: Joi.string().required(),
      title: Joi.string().required(),
      email: Joi.string().required(),
      message: Joi.string().required(),
      position: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyEmployeesController.create,
);
companyEmployeesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      position: Joi.string().required(),
      isActive: Joi.boolean().required(),
      email: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyEmployeesController.update,
);
companyEmployeesRouter.put(
  '/access_key/:id',
  celebrate({
    [Segments.BODY]: {
      access_key: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyEmployeesController.updateAccessKey,
);
companyEmployeesRouter.put(
  'password/:id',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  companyEmployeesController.updatePassword,
);
companyEmployeesRouter.get(
  '/:company_id',
  ensureAuthenticated,
  companyEmployeesController.index,
);
companyEmployeesRouter.get(
  '/employee/:employee_id',
  companyEmployeesController.show,
);
companyEmployeesRouter.delete(
  '/:id',
  ensureAuthenticated,
  companyEmployeesController.delete,
);

export default companyEmployeesRouter;
