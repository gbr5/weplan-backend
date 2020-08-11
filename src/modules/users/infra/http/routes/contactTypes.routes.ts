import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ContactTypesController from '@modules/users/infra/http/controllers/ContactTypesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactTypesRouter = Router();
const contactTypesController = new ContactTypesController();

contactTypesRouter.use(ensureAuthenticated);

contactTypesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  contactTypesController.create,
);

contactTypesRouter.get('/', contactTypesController.index);

contactTypesRouter.put('/:contact_type', contactTypesController.update);

contactTypesRouter.delete('/:contact_type', contactTypesController.delete);

export default contactTypesRouter;
