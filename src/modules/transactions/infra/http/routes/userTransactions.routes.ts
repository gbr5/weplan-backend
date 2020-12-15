import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserTransactionController from '@modules/transactions/infra/http/controllers/UserTransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userTransactionRouter = Router();
const userTransactionController = new UserTransactionController();

userTransactionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      main_transaction_id: Joi.string().required(),
      user_id: Joi.string().required(),
      transaction_type: Joi.string().required(),
      weplanUser: Joi.string().required(),
      weplanUserType: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  userTransactionController.create,
);
userTransactionRouter.get('/:user_id', userTransactionController.index);
userTransactionRouter.delete('/:id', userTransactionController.delete);

userTransactionRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      transaction_type: Joi.string().required(),
      weplanUser: Joi.string().required(),
      weplanUserType: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  userTransactionController.update,
);

export default userTransactionRouter;
