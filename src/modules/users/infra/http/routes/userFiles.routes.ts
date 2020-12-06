import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UserFilesController from '@modules/users/infra/http/controllers/UserFilesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userFilesRouter = Router();
const upload = multer(uploadConfig.multer);
const userFilesController = new UserFilesController();

userFilesRouter.post(
  '/:user_id/:file_name',
  ensureAuthenticated,
  upload.single('url'),
  userFilesController.create,
);

userFilesRouter.get('/:user_id', ensureAuthenticated, userFilesController.list);
userFilesRouter.put('/:id', ensureAuthenticated, userFilesController.update);
userFilesRouter.delete('/:id', ensureAuthenticated, userFilesController.delete);

// userFilesRouter.patch(
//   '/avatar/:user_id',
//   ensureAuthenticated,
//   upload.single('avatar'),
//   userAvatarController.update,
// );

export default userFilesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
