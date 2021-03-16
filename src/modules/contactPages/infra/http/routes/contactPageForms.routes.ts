import { Router } from 'express';

import ContactPageFormsController from '@modules/contactPages/infra/http/controllers/ContactPageFormsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const contactPageFormsRouter = Router();
const contactPageFormsController = new ContactPageFormsController();

contactPageFormsRouter.use(ensureAuthenticated);

contactPageFormsRouter.post('/', contactPageFormsController.create);
contactPageFormsRouter.put('/:id', contactPageFormsController.update);
contactPageFormsRouter.delete('/:id', contactPageFormsController.delete);

export default contactPageFormsRouter;
