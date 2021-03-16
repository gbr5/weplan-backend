import { Router } from 'express';

import ContactPageSEOController from '@modules/contactPages/infra/http/controllers/ContactPageSEOController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactPageSEORouter = Router();
const contactPageSEOController = new ContactPageSEOController();

contactPageSEORouter.use(ensureAuthenticated);

contactPageSEORouter.post('/', contactPageSEOController.create);
contactPageSEORouter.put('/:id', contactPageSEOController.update);
contactPageSEORouter.delete('/:id', contactPageSEOController.delete);

export default contactPageSEORouter;
