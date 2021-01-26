import { Router } from 'express';

import UserImageCategoriesController from '@modules/users/infra/http/controllers/UserImageCategoriesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userImageCategoriesRouter = Router();
const userImageCategoriesController = new UserImageCategoriesController();

userImageCategoriesRouter.post(
  '/',
  ensureAuthenticated,
  userImageCategoriesController.create,
);

userImageCategoriesRouter.get(
  '/:user_id',
  ensureAuthenticated,
  userImageCategoriesController.list,
);
userImageCategoriesRouter.put(
  '/:id',
  ensureAuthenticated,
  userImageCategoriesController.update,
);
userImageCategoriesRouter.delete(
  '/:id',
  ensureAuthenticated,
  userImageCategoriesController.delete,
);

// userImageCategoriesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default userImageCategoriesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
