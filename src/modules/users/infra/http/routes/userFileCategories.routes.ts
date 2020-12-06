import { Router } from 'express';

import UserFileCategoriesController from '@modules/users/infra/http/controllers/UserFileCategoriesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userFileCategoriesRouter = Router();
const userFileCategoriesController = new UserFileCategoriesController();

userFileCategoriesRouter.post(
  '/',
  ensureAuthenticated,
  userFileCategoriesController.create,
);

userFileCategoriesRouter.get(
  '/:user_id',
  ensureAuthenticated,
  userFileCategoriesController.list,
);
userFileCategoriesRouter.put(
  '/:id',
  ensureAuthenticated,
  userFileCategoriesController.update,
);
userFileCategoriesRouter.delete(
  '/:id',
  ensureAuthenticated,
  userFileCategoriesController.delete,
);

// userFileCategoriesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default userFileCategoriesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
