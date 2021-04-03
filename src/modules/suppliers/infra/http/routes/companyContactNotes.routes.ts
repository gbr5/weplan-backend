import { Router } from 'express';

import CompanyContactNotesController from '@modules/suppliers/infra/http/controllers/CompanyContactNotesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const companyContactNotesRouter = Router();
const companyContactNotesController = new CompanyContactNotesController();

// === $$ === $ ==> Contacts <== $ === $$ === //

companyContactNotesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_contact_id: Joi.string().required(),
      note: Joi.string().required(),
    },
  }),
  companyContactNotesController.create,
);
companyContactNotesRouter.put(
  '/:id',
  ensureAuthenticated,
  companyContactNotesController.update,
);
companyContactNotesRouter.get(
  '/:company_id',
  ensureAuthenticated,
  companyContactNotesController.index,
);
companyContactNotesRouter.delete(
  '/:id',
  ensureAuthenticated,
  companyContactNotesController.delete,
);

export default companyContactNotesRouter;
