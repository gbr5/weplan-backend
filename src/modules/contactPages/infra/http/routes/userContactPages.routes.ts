import { Router } from 'express';

import UserContactPagesController from '@modules/contactPages/infra/http/controllers/UserContactPagesController';
import ContactPageMainImageController from '@modules/contactPages/infra/http/controllers/ContactPageMainImageController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import multer from 'multer';
import uploadConfig from '@config/upload';

const userContactPagesRouter = Router();
const upload = multer(uploadConfig.multer);
const userContactPagesController = new UserContactPagesController();
const contactPageMainImageController = new ContactPageMainImageController();

userContactPagesRouter.use(ensureAuthenticated);

userContactPagesRouter.post('/', userContactPagesController.create);
userContactPagesRouter.get('/show/:id', userContactPagesController.show);
userContactPagesRouter.get('/', userContactPagesController.list);
userContactPagesRouter.put('/:id', userContactPagesController.update);
userContactPagesRouter.delete('/:id', userContactPagesController.delete);

userContactPagesRouter.patch(
  '/image/:contact_page_id',
  upload.single('image_url'),
  contactPageMainImageController.update,
);

export default userContactPagesRouter;
