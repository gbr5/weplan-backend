import { Router } from 'express';

import ContactFilesController from '@modules/users/infra/http/controllers/ContactFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactFilesRouter = Router();
const contactFilesController = new ContactFilesController();

contactFilesRouter.post(
  '/',
  ensureAuthenticated,
  contactFilesController.create,
);

contactFilesRouter.get(
  '/:contact_id',
  ensureAuthenticated,
  contactFilesController.list,
);
contactFilesRouter.delete(
  '/:id',
  ensureAuthenticated,
  contactFilesController.delete,
);

// contactFilesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default contactFilesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
