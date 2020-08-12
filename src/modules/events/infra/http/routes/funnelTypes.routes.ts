import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FunnelTypesController from '@modules/events/infra/http/controllers/FunnelTypesController';
// import FunnelTypeSuppliersController from '@modules/events/infra/http/controllers/FunnelTypeSuppliersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const funnelTypesRouter = Router();
const funnelTypesController = new FunnelTypesController();
// const funnelTypeSuppliersController = new FunnelTypeSuppliersController();

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

// funnelTypesRouter.post('/:event_type', funnelTypeSuppliersController.create);

// funnelTypesRouter.get('/:event_type', funnelTypeSuppliersController.index);

// funnelTypesRouter.get(
//   '/:event_type/:user_id',
//   funnelTypeSuppliersController.show,
// );

// funnelTypesRouter.delete('/:event_type/', funnelTypeSuppliersController.delete);

export default funnelTypesRouter;
