import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FunnelsController from '@modules/suppliers/infra/http/controllers/FunnelsController';
import FunnelStagesController from '@modules/suppliers/infra/http/controllers/FunnelStagesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const supplierFunnelsRouter = Router();
const funnelsController = new FunnelsController();
const funnelStagesController = new FunnelStagesController();

supplierFunnelsRouter.use(ensureAuthenticated);

supplierFunnelsRouter.post(
  '/:supplier_id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      funnel_type: Joi.string().required(),
    },
  }),
  funnelsController.create,
);

supplierFunnelsRouter.get('/:supplier_id', funnelsController.index);

supplierFunnelsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  funnelsController.update,
);

supplierFunnelsRouter.delete('/:id', funnelsController.delete);

supplierFunnelsRouter.post(
  '/:funnel_id/stages',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      funnel_order: Joi.number().required(),
    },
  }),
  funnelStagesController.create,
);

supplierFunnelsRouter.get('/:funnel_id/stages', funnelStagesController.index);

supplierFunnelsRouter.put(
  '/:funnel_id/stages/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      funnel_order: Joi.number().required(),
    },
  }),
  funnelStagesController.update,
);

supplierFunnelsRouter.delete(
  '/:funnel_id/stages/:id',
  funnelStagesController.delete,
);

export default supplierFunnelsRouter;
