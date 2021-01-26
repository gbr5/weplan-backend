import { Router } from 'express';

import CategoryImagesController from '@modules/users/infra/http/controllers/CategoryImagesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const categoryImagesRouter = Router();
const categoryImagesController = new CategoryImagesController();

categoryImagesRouter.post(
  '/',
  ensureAuthenticated,
  categoryImagesController.create,
);

categoryImagesRouter.get(
  '/:category_id',
  ensureAuthenticated,
  categoryImagesController.list,
);
categoryImagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  categoryImagesController.delete,
);

// categoryImagesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default categoryImagesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
