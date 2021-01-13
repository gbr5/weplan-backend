import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UserImagesController from '@modules/users/infra/http/controllers/UserImagesController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userImagesRouter = Router();
const upload = multer(uploadConfig.multer);
const userImagesController = new UserImagesController();

userImagesRouter.post(
  '/:name/:description',
  ensureAuthenticated,
  upload.single('image_name'),
  userImagesController.create,
);

userImagesRouter.get(
  '/:user_id',
  ensureAuthenticated,
  userImagesController.list,
);
userImagesRouter.put('/:id', ensureAuthenticated, userImagesController.update);
userImagesRouter.delete(
  '/:id',
  ensureAuthenticated,
  userImagesController.delete,
);

export default userImagesRouter;

// Rota: Aqui só pode ter funções para receber a requisição,
// chamar outro arquivo, devolver uma resposta
