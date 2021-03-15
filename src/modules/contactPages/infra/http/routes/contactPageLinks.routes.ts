import { Router } from 'express';

import ContactPageLinksController from '@modules/contactPages/infra/http/controllers/ContactPageLinksController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactPageLinksRouter = Router();
const contactPageLinksController = new ContactPageLinksController();

contactPageLinksRouter.use(ensureAuthenticated);

contactPageLinksRouter.post('/', contactPageLinksController.create);
contactPageLinksRouter.put('/:id', contactPageLinksController.update);
contactPageLinksRouter.delete('/:id', contactPageLinksController.delete);

export default contactPageLinksRouter;
