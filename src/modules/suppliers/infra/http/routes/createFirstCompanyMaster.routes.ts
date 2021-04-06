import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import CreateFirstCompanyMasterController from '@modules/suppliers/infra/http/controllers/CreateFirstCompanyMasterController';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const createFirstCompanyMasterRouter = Router();
const createFirstCompanyMasterController = new CreateFirstCompanyMasterController();

// createFirstCompanyMasterRouter.use(ensureAuthenticated);

// === Card Customers === //

createFirstCompanyMasterRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     user_id: Joi.string().required(),
  //     companyEmail: Joi.string().required(),
  //     email: Joi.string().required(),
  //     password: Joi.string().required(),
  //   },
  // }),
  createFirstCompanyMasterController.create,
);

export default createFirstCompanyMasterRouter;
