import { Router } from 'express';

import ContactPagePostsController from '@modules/contactPages/infra/http/controllers/ContactPagePostsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactPagePostsRouter = Router();
const contactPagePostsController = new ContactPagePostsController();

contactPagePostsRouter.use(ensureAuthenticated);

contactPagePostsRouter.post('/', contactPagePostsController.create);
contactPagePostsRouter.put('/:id', contactPagePostsController.update);
contactPagePostsRouter.delete('/:id', contactPagePostsController.delete);

export default contactPagePostsRouter;
