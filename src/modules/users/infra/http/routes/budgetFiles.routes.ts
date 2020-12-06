import { Router } from 'express';

import BudgetFilesController from '@modules/users/infra/http/controllers/BudgetFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const budgetFilesRouter = Router();
const budgetFilesController = new BudgetFilesController();

budgetFilesRouter.post('/', ensureAuthenticated, budgetFilesController.create);

budgetFilesRouter.get(
  '/:budget_id',
  ensureAuthenticated,
  budgetFilesController.list,
);
budgetFilesRouter.delete(
  '/:id',
  ensureAuthenticated,
  budgetFilesController.delete,
);

// budgetFilesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default budgetFilesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
