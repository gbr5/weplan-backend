import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardCustomersController from '@modules/suppliers/infra/http/controllers/CardCustomersController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardCustomersRouter = Router();
const cardCustomersController = new CardCustomersController();

cardCustomersRouter.use(ensureAuthenticated);

// === Card Customers === //

cardCustomersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      card_unique_name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  cardCustomersController.create,
);

cardCustomersRouter.get('/:card_unique_name', cardCustomersController.index);

cardCustomersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  cardCustomersController.update,
);

cardCustomersRouter.delete('/:id', cardCustomersController.delete);

export default cardCustomersRouter;
