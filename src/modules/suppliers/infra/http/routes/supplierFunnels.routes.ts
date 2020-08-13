import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FunnelsController from '@modules/suppliers/infra/http/controllers/FunnelsController';
import FunnelStagesController from '@modules/suppliers/infra/http/controllers/FunnelStagesController';
import StageCardsController from '@modules/suppliers/infra/http/controllers/StageCardsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const supplierFunnelsRouter = Router();
const funnelsController = new FunnelsController();
const funnelStagesController = new FunnelStagesController();
const stageCardsController = new StageCardsController();

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

// === Funnel Stages === //

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

// === Stage Cards === //

supplierFunnelsRouter.post(
  '/:stage_id/cards',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      card_owner: Joi.string().required(),
    },
  }),
  stageCardsController.create,
);

supplierFunnelsRouter.get('/:stage_id/cards', stageCardsController.index);

supplierFunnelsRouter.put(
  '/:stage_id/cards/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      card_owner: Joi.string().required(),
      new_stage_id: Joi.string().required(),
    },
  }),
  stageCardsController.update,
);

supplierFunnelsRouter.delete(
  '/:stage_id/cards/:id',
  stageCardsController.delete,
);

export default supplierFunnelsRouter;
