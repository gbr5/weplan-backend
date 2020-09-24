import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TransactionAgreementsController from '@modules/finances/infra/http/controllers/TransactionAgreementsController';
import TransactionsController from '@modules/finances/infra/http/controllers/TransactionsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const financesRouter = Router();
const transactionAgreementsController = new TransactionAgreementsController();
const transactionsController = new TransactionsController();

financesRouter.use(ensureAuthenticated);

// === Appointment === //

financesRouter.post(
  '/transaction-agreements',
  celebrate({
    [Segments.BODY]: {
      supplier_id: Joi.string().required(),
      amount: Joi.number().required(),
      number_of_installments: Joi.number().required(),
    },
  }),
  transactionAgreementsController.create,
);

financesRouter.put(
  '/transaction-agreements/:id',
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().required(),
      number_of_installments: Joi.number().required(),
    },
  }),
  transactionAgreementsController.update,
);

financesRouter.delete(
  '/transaction-agreements/:id',
  transactionAgreementsController.delete,
);

financesRouter.get(
  '/transaction-agreements/:supplier_id',
  transactionAgreementsController.index,
);

// === Supplier Appointment's, with a non User Guest === //

financesRouter.post(
  '/agreements/transactions',
  celebrate({
    [Segments.BODY]: {
      agreement_id: Joi.string().required(),
      amount: Joi.number().required(),
      due_date: Joi.date(),
      isPaid: Joi.boolean().required(),
    },
  }),
  transactionsController.create,
);

financesRouter.put(
  '/agreements/transactions/:id',
  celebrate({
    [Segments.BODY]: {
      amount: Joi.number().required(),
      due_date: Joi.date(),
      isPaid: Joi.boolean().required(),
    },
  }),
  transactionsController.update,
);

financesRouter.delete(
  '/agreements/transactions/:id',
  transactionsController.delete,
);

financesRouter.get(
  '/agreements/transactions/:agreement_id',
  transactionsController.index,
);

export default financesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
