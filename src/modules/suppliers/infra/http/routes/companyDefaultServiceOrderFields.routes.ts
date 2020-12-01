import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CompanyDefaultServiceOrderFieldsController from '@modules/suppliers/infra/http/controllers/CompanyDefaultServiceOrderFieldsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const companyDefaultServiceOrderFieldsRouter = Router();
const companyDefaultServiceOrderFieldsController = new CompanyDefaultServiceOrderFieldsController();

companyDefaultServiceOrderFieldsRouter.use(ensureAuthenticated);

// === Card Budgets === //

companyDefaultServiceOrderFieldsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_id: Joi.string().required(),
      field_name: Joi.string().required(),
      field_type: Joi.string().required(),
      isRequired: Joi.boolean().required(),
    },
  }),
  companyDefaultServiceOrderFieldsController.create,
);

companyDefaultServiceOrderFieldsRouter.get(
  '/:company_id',
  companyDefaultServiceOrderFieldsController.index,
);

companyDefaultServiceOrderFieldsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      field_name: Joi.string().required(),
      field_type: Joi.string().required(),
      isRequired: Joi.boolean().required(),
    },
  }),
  companyDefaultServiceOrderFieldsController.update,
);

companyDefaultServiceOrderFieldsRouter.delete(
  '/:id',
  companyDefaultServiceOrderFieldsController.delete,
);

export default companyDefaultServiceOrderFieldsRouter;
