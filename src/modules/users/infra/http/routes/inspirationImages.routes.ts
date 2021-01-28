import { Router } from 'express';

import InspirationImagesController from '@modules/users/infra/http/controllers/InspirationImagesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const inspirationImagesRouter = Router();
const inspirationImagesController = new InspirationImagesController();

inspirationImagesRouter.post(
  '/',
  ensureAuthenticated,
  inspirationImagesController.create,
);

inspirationImagesRouter.get(
  '/:user_id',
  ensureAuthenticated,
  inspirationImagesController.list,
);
inspirationImagesRouter.put(
  '/:id',
  ensureAuthenticated,
  inspirationImagesController.update,
);
inspirationImagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  inspirationImagesController.delete,
);

// inspirationImagesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default inspirationImagesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
