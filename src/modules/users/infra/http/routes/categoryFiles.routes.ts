import { Router } from 'express';

import CategoryFilesController from '@modules/users/infra/http/controllers/CategoryFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const categoryFilesRouter = Router();
const categoryFilesController = new CategoryFilesController();

categoryFilesRouter.post(
  '/',
  ensureAuthenticated,
  categoryFilesController.create,
);

categoryFilesRouter.get(
  '/:category_id',
  ensureAuthenticated,
  categoryFilesController.list,
);
categoryFilesRouter.delete(
  '/:id',
  ensureAuthenticated,
  categoryFilesController.delete,
);

// categoryFilesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default categoryFilesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
