import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FunnelsController from '@modules/suppliers/infra/http/controllers/FunnelsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const supplierFunnelsRouter = Router();
const funnelsController = new FunnelsController();

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

export default supplierFunnelsRouter;
