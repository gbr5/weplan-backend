import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MainTransactionController from '@modules/transactions/infra/http/controllers/MainTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const mainTransactionRouter = Router();
const mainTransactionController = new MainTransactionController();

mainTransactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      value: Joi.number().required(),
      date: Joi.date().required(),
    },
  }),
  mainTransactionController.create,
);
mainTransactionRouter.get('/', mainTransactionController.index);
mainTransactionRouter.delete('/:id', mainTransactionController.delete);

mainTransactionRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      value: Joi.number().required(),
      date: Joi.date().required(),
    },
  }),
  mainTransactionController.update,
);

export default mainTransactionRouter;
