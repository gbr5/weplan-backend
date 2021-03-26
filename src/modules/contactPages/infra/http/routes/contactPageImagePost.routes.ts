import { Router } from 'express';

import ContactPageImagePostController from '@modules/contactPages/infra/http/controllers/ContactPageImagePostController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import multer from 'multer';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig.multer);

const contactPageImagePostRouter = Router();
const contactPageImagePostController = new ContactPageImagePostController();

contactPageImagePostRouter.use(ensureAuthenticated);

contactPageImagePostRouter.patch(
  '/:id',
  upload.single('image_url'),
  contactPageImagePostController.update,
);

export default contactPageImagePostRouter;
