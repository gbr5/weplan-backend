import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CardBudgetsController from '@modules/suppliers/infra/http/controllers/CardBudgetsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardBudgetsRouter = Router();
const cardBudgetsController = new CardBudgetsController();

cardBudgetsRouter.use(ensureAuthenticated);

// === Card Budgets === //

cardBudgetsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      company_id: Joi.string().required(),
      sales_person_id: Joi.string().required(),
      card_unique_name: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
      validity_date: Joi.date().required(),
      number_of_installments: Joi.number().required(),
      isValid: Joi.boolean().required(),
    },
  }),
  cardBudgetsController.create,
);

cardBudgetsRouter.get(
  '/:card_unique_name',
  cardBudgetsController.listCardBudgets,
);
cardBudgetsRouter.get(
  '/customer/:customer_id',
  cardBudgetsController.listCustomerBudgets,
);
cardBudgetsRouter.get(
  '/company/:company_id',
  cardBudgetsController.listCompanyBudgets,
);
cardBudgetsRouter.get(
  '/sales_person/:sales_person_id/:company_id',
  cardBudgetsController.listSalesPersonBudgets,
);

cardBudgetsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      value: Joi.number().required(),
      validity_date: Joi.date().required(),
      number_of_installments: Joi.number().required(),
      isValid: Joi.boolean().required(),
    },
  }),
  cardBudgetsController.update,
);

cardBudgetsRouter.delete('/:id', cardBudgetsController.delete);

export default cardBudgetsRouter;