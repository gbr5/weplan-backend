import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import WeplanProductsController from '@modules/weplan/infra/http/controllers/WeplanProductsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const weplanProductsRouter = Router();
const weplanProductsController = new WeplanProductsController();

weplanProductsRouter.use(ensureAuthenticated);

weplanProductsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      target_audience: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  weplanProductsController.create,
);

weplanProductsRouter.get('/', weplanProductsController.index);

weplanProductsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      target_audience: Joi.string().required(),
      price: Joi.number().required(),
    },
  }),
  weplanProductsController.update,
);
weplanProductsRouter.delete('/:id', weplanProductsController.delete);

export default weplanProductsRouter;
