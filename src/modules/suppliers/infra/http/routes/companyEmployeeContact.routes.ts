import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CompanyEmployeeContactController from '@modules/suppliers/infra/http/controllers/CompanyEmployeeContactController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const companyEmployeeContactRouter = Router();
const companyEmployeeContactController = new CompanyEmployeeContactController();

companyEmployeeContactRouter.use(ensureAuthenticated);

companyEmployeeContactRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_contact_id: Joi.string().required(),
      employee_id: Joi.string().required(),
    },
  }),
  companyEmployeeContactController.create,
);

companyEmployeeContactRouter.get(
  '/:company_contact_id',
  companyEmployeeContactController.show,
);

companyEmployeeContactRouter.get(
  '/employee/:employee_id',
  companyEmployeeContactController.showEmployee,
);

export default companyEmployeeContactRouter;
