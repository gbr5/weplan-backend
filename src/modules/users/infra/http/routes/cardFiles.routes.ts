import { Router } from 'express';

import CardFilesController from '@modules/users/infra/http/controllers/CardFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const cardFilesRouter = Router();
const cardFilesController = new CardFilesController();

cardFilesRouter.post('/', ensureAuthenticated, cardFilesController.create);

cardFilesRouter.get(
  '/:card_unique_name',
  ensureAuthenticated,
  cardFilesController.list,
);
cardFilesRouter.delete('/:id', ensureAuthenticated, cardFilesController.delete);

// cardFilesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default cardFilesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
