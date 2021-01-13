import { Router } from 'express';

import ImageParticipantsController from '@modules/users/infra/http/controllers/ImageParticipantsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const imageParticipantsRouter = Router();
const imageParticipantsController = new ImageParticipantsController();

imageParticipantsRouter.post(
  '/:image_id',
  ensureAuthenticated,
  imageParticipantsController.create,
);

imageParticipantsRouter.get(
  '/:image_id',
  ensureAuthenticated,
  imageParticipantsController.list,
);
imageParticipantsRouter.delete(
  '/:id',
  ensureAuthenticated,
  imageParticipantsController.delete,
);

export default imageParticipantsRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
