import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FunnelTypesController from '@modules/suppliers/infra/http/controllers/FunnelTypesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const funnelTypesRouter = Router();
const funnelTypesController = new FunnelTypesController();

funnelTypesRouter.use(ensureAuthenticated);

funnelTypesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  funnelTypesController.create,
);

funnelTypesRouter.get('/', funnelTypesController.index);

funnelTypesRouter.put(
  '/:name',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  funnelTypesController.update,
);

export default funnelTypesRouter;
